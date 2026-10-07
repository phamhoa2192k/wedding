param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$Path,

    [int]$Quality = 70,

    [int]$MaxDim = 2400,

    [string]$Output = ""
)

Add-Type -AssemblyName System.Drawing

$resolvedPath = $Path
if (-not (Test-Path $resolvedPath)) {

    $inRootImages = Join-Path $PSScriptRoot "..\assets\root_images" $Path
    if (Test-Path $inRootImages) {
        $resolvedPath = (Resolve-Path $inRootImages).Path
    } else {
        Write-Error "Không tìm thấy file: $Path"
        exit 1
    }
} else {
    $resolvedPath = (Resolve-Path $resolvedPath).Path
}

$fileItem = Get-Item $resolvedPath
$origSize = $fileItem.Length
$isOverwrite = [string]::IsNullOrWhiteSpace($Output)
$outPath = if ($isOverwrite) { $resolvedPath + ".tmp" } else { (Join-Path (Get-Location) $Output) }

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
    $targetImg = $img
    $resized = $null

    if ($MaxDim -gt 0 -and ($w -gt $MaxDim -or $h -gt $MaxDim)) {
        if ($w -gt $h) {
            $newW = $MaxDim
            $newH = [int]($h * ($MaxDim / $w))
        } else {
            $newH = $MaxDim
            $newW = [int]($w * ($MaxDim / $h))
        }
        $resized = New-Object System.Drawing.Bitmap($newW, $newH)
        $g = [System.Drawing.Graphics]::FromImage($resized)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.DrawImage($img, 0, 0, $newW, $newH)
        $g.Dispose()
        $targetImg = $resized
    }

    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)

    $targetImg.Save($outPath, $codec, $encoderParams)

    $finalW = $targetImg.Width
    $finalH = $targetImg.Height

    if ($resized -ne $null) { $resized.Dispose() }
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
    Write-Host ("- Dung lượng: {0:N2} MB -> {1:N2} MB (Tiết kiệm {2}%)" -f ($origSize / 1MB), ($newSize / 1MB), $savedPct)
}
catch {
    Write-Error "Lỗi khi xử lý ảnh: $($_.Exception.Message)"
    if (Test-Path $outPath) {
        Remove-Item $outPath -Force
    }
}
