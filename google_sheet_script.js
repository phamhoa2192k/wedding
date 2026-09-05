/**
 * ==========================================================================
 * GOOGLE APPS SCRIPT - TỰ ĐỘNG LƯU XÁC NHẬN THAM DỰ VÀO GOOGLE SHEETS
 * ==========================================================================
 * 
 * HƯỚNG DẪN CÀI ĐẶT NHANH (Chỉ mất 2 phút):
 * 1. Truy cập https://sheets.new để tạo một trang tính Google mới (đặt tên ví dụ: "Khách Mời Đám Cưới").
 * 2. Trên thanh menu, chọn: Tiện ích mở rộng (Extensions) -> Apps Script.
 * 3. Xoá toàn bộ code mặc định trong cửa sổ Apps Script và DÁN TOÀN BỘ đoạn code bên dưới này vào.
 * 4. Bấm biểu tượng Lưu (Save / phím Ctrl + S).
 * 5. Bấm nút "Triển khai" (Deploy) ở góc trên bên phải -> Chọn "Tùy chọn triển khai mới" (New deployment).
 * 6. Bấm vào icon bánh răng (Select type) bên cạnh -> Chọn "Ứng dụng web" (Web app):
 *    - Phần Mô tả (Description): "Wedding RSVP Web App"
 *    - Thực thi dưới dạng (Execute as): "Tôi" (Me / email của bạn)
 *    - Ai có quyền truy cập (Who has access): "Bất kỳ ai" (Anyone)  <--- BẮT BUỘC CHỌN "ANYONE"
 * 7. Bấm "Triển khai" (Deploy) -> Cấp quyền cho ứng dụng truy cập trang tính nếu được hỏi.
 * 8. Sao chép "URL của ứng dụng web" (Web app URL có đuôi /exec) và dán vào file js/config.js tại mục:
 *    rsvp: {
 *      googleSheetScriptUrl: 'URL_BẠN_VỪA_SAO_CHÉP'
 *    }
 * ==========================================================================
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Tự động tạo hàng tiêu đề nếu sheet còn trống
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Thời Gian Gửi",
        "Họ và Tên",
        "Lời Chúc",
        "Xác Nhận Tham Dự",
        "Người Đi Cùng",
        "Khách Của Ai"
      ]);
      // Định dạng dòng tiêu đề: In đậm, nền xanh xám thanh lịch
      sheet.getRange(1, 1, 1, 6).setFontWeight("bold").setBackground("#e2e8f0").setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }
    
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else {
      data = e.parameter || {};
    }
    
    // Định dạng múi giờ Việt Nam (GMT+7)
    var timestamp = Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy HH:mm:ss");
    var name = data.name || "";
    var wishes = data.wishes || "";
    var attendance = data.attendance || "";
    var plusOne = data.plus_one || data.plusOne || "Không có";
    var guestOf = data.guest_of || data.guestOf || "";
    
    // Thêm dòng mới vào Google Sheet
    sheet.appendRow([
      timestamp,
      name,
      wishes,
      attendance,
      plusOne,
      guestOf
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Đã lưu thành công vào Google Sheet"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
