param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$Path,

    [int]$Quality = 75,

    [int]$MaxDim = 2400,

    [string]$Output = "",

    [int]$TargetMinKB = 0,

    [int]$TargetMaxKB = 0
)

Add-Type -AssemblyName System.Drawing

function Create-ResizedBitmap($sourceImg, $maxDimension) {
    $srcW = $sourceImg.Width
    $srcH = $sourceImg.Height
    if ($maxDimension -gt 0 -and ($srcW -gt $maxDimension -or $srcH -gt $maxDimension)) {
        if ($srcW -gt $srcH) {
            $nW = $maxDimension
            $nH = [int]($srcH * ($maxDimension / $srcW))
        } else {
            $nH = $maxDimension
            $nW = [int]($srcW * ($maxDimension / $srcH))
        }
        $bmp = New-Object System.Drawing.Bitmap($nW, $nH)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.DrawImage($sourceImg, 0, 0, $nW, $nH)
        $g.Dispose()
        return $bmp
    }
    return $sourceImg
}

function Compress-SingleImage {
    param(
        [string]$FilePath,
        [int]$Quality = 75,
        [int]$MaxDim = 2400,
        [string]$OutputFile = "",
        [int]$TargetMinKB = 0,
        [int]$TargetMaxKB = 0
    )

    $resolvedPath = (Resolve-Path $FilePath).Path
    $fileItem = Get-Item $resolvedPath
    $origSize = $fileItem.Length
    $isOverwrite = [string]::IsNullOrWhiteSpace($OutputFile)
    $outPath = if ($isOverwrite) { 
        $resolvedPath + ".tmp" 
    } else { 
        if ([System.IO.Path]::IsPathRooted($OutputFile)) { $OutputFile } else { Join-Path (Get-Location) $OutputFile } 
    }

    Write-Host "Đang xử lý: $($fileItem.Name)..." -ForegroundColor Cyan

    try {
        $bytes = [System.IO.File]::ReadAllBytes($resolvedPath)
        $ms = New-Object System.IO.MemoryStream(,$bytes)
        $img = [System.Drawing.Image]::FromStream($ms)

        $orient = 0
        if ($img.PropertyIdList -contains 0x0112) {
            $prop = $img.GetPropertyItem(0x0112)
            $orient = [BitConverter]::ToUInt16($prop.Value, 0)
            switch ($orient) {
                1 { }
                2 { $img.RotateFlip([System.Drawing.RotateFlipType]::RotateNoneFlipX) }
                3 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
                4 { $img.RotateFlip([System.Drawing.RotateFlipType]::RotateNoneFlipY) }
                5 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipX) }
                6 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
                7 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipX) }
                8 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
            }
            $img.RemovePropertyItem(0x0112)
        }

        $w = $img.Width
        $h = $img.Height

        $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }

        $chosenQuality = $Quality
        $chosenDim = $MaxDim
        $bestData = $null
        $finalW = $w
        $finalH = $h

        if ($TargetMinKB -gt 0 -or $TargetMaxKB -gt 0) {
            $minBytes = if ($TargetMinKB -gt 0) { $TargetMinKB * 1KB } else { 0 }
            $maxBytes = if ($TargetMaxKB -gt 0) { $TargetMaxKB * 1KB } else { [long]::MaxValue }

            $candidateQualities = @($Quality, 78, 82, 85, 75, 88, 90, 72, 70, 92, 95, 65, 60) | Select-Object -Unique
            $candidateDims = @($MaxDim, 2600, 2800, 2000, 1800, 1600) | Select-Object -Unique

            $bitmapCache = @{}
            $found = $false

            foreach ($dim in $candidateDims) {
                if (-not $bitmapCache.ContainsKey($dim)) {
                    $bitmapCache[$dim] = Create-ResizedBitmap $img $dim
                }
                $targetImg = $bitmapCache[$dim]

                foreach ($q in $candidateQualities) {
                    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
                    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$q)
                    $testMs = New-Object System.IO.MemoryStream
                    $targetImg.Save($testMs, $codec, $encoderParams)

                    $testLen = $testMs.Length
                    if ($testLen -ge $minBytes -and $testLen -le $maxBytes) {
                        $bestData = $testMs.ToArray()
                        $chosenQuality = $q
                        $chosenDim = $dim
                        $finalW = $targetImg.Width
                        $finalH = $targetImg.Height
                        $found = $true
                        $testMs.Dispose()
                        break
                    }
                    $testMs.Dispose()
                }

                if ($found) { break }
            }

            foreach ($key in $bitmapCache.Keys) {
                if ($bitmapCache[$key] -ne $img) {
                    $bitmapCache[$key].Dispose()
                }
            }

            if (-not $found) {
                $targetImg = Create-ResizedBitmap $img $chosenDim
                $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
                $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$chosenQuality)
                $testMs = New-Object System.IO.MemoryStream
                $targetImg.Save($testMs, $codec, $encoderParams)
                $bestData = $testMs.ToArray()
                $finalW = $targetImg.Width
                $finalH = $targetImg.Height
                $testMs.Dispose()
                if ($targetImg -ne $img) { $targetImg.Dispose() }
            }

            [System.IO.File]::WriteAllBytes($outPath, $bestData)
        } else {
            $targetImg = Create-ResizedBitmap $img $MaxDim
            $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)
            $targetImg.Save($outPath, $codec, $encoderParams)
            $finalW = $targetImg.Width
            $finalH = $targetImg.Height
            if ($targetImg -ne $img) { $targetImg.Dispose() }
        }

        $img.Dispose()
        $ms.Dispose()

        if ($isOverwrite) {
            Move-Item -Path $outPath -Destination $resolvedPath -Force
            $finalPath = $resolvedPath
        } else {
            $finalPath = $outPath
        }

        $newSize = (Get-Item $finalPath).Length
        $savedPct = [math]::Round((1 - ($newSize / $origSize)) * 100, 1)

        Write-Host " Hoàn tất: $finalPath" -ForegroundColor Green
        Write-Host ("- Kích thước: {0}x{1} -> {2}x{3}" -f $w, $h, $finalW, $finalH)
        Write-Host ("- Dung lượng: {0:N2} MB -> {1:N2} MB ({2:N1} KB, Tiết kiệm {3}%) [Q: {4}]" -f ($origSize / 1MB), ($newSize / 1MB), ($newSize / 1KB), $savedPct, $chosenQuality)
    }
    catch {
        Write-Error "Lỗi khi xử lý ảnh $FilePath : $($_.Exception.Message)"
        if (Test-Path $outPath) {
            Remove-Item $outPath -Force
        }
    }
}

$resolvedPath = $Path
if (-not (Test-Path $resolvedPath)) {
    $inRootImages = Join-Path $PSScriptRoot "..\assets\root_images" $Path
    if (Test-Path $inRootImages) {
        $resolvedPath = (Resolve-Path $inRootImages).Path
    } else {
        Write-Error "Không tìm thấy file hoặc thư mục: $Path"
        exit 1
    }
} else {
    $resolvedPath = (Resolve-Path $resolvedPath).Path
}

if ((Get-Item $resolvedPath) -is [System.IO.DirectoryInfo]) {
    $supportedExts = @('.jpg', '.jpeg', '.png')
    $files = Get-ChildItem -Path $resolvedPath -File | Where-Object { $supportedExts -contains $_.Extension.ToLower() }
    if ($files.Count -eq 0) {
        Write-Warning "Không tìm thấy file ảnh nào trong thư mục: $resolvedPath"
        exit 0
    }
    Write-Host "Tìm thấy $($files.Count) ảnh trong thư mục $resolvedPath. Bắt đầu xử lý..." -ForegroundColor Yellow
    $idx = 1
    foreach ($file in $files) {
        Write-Host "[$idx/$($files.Count)] " -NoNewline -ForegroundColor DarkGray
        Compress-SingleImage -FilePath $file.FullName -Quality $Quality -MaxDim $MaxDim -OutputFile "" -TargetMinKB $TargetMinKB -TargetMaxKB $TargetMaxKB
        $idx++
    }
    Write-Host "Đã hoàn thành nén $($files.Count) ảnh!" -ForegroundColor Green
} else {
    Compress-SingleImage -FilePath $resolvedPath -Quality $Quality -MaxDim $MaxDim -OutputFile $Output -TargetMinKB $TargetMinKB -TargetMaxKB $TargetMaxKB
}
