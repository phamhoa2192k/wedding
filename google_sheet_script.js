function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Thời Gian Gửi",
        "Họ và Tên",
        "Lời Chúc",
        "Xác Nhận Tham Dự",
        "Người Đi Cùng",
        "Khách Của Ai"
      ]);

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

    var timestamp = Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy HH:mm:ss");
    var name = data.name || "";
    var wishes = data.wishes || "";
    var attendance = data.attendance || "";
    var plusOne = data.plus_one || data.plusOne || "Không có";
    var guestOf = data.guest_of || data.guestOf || "";

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
