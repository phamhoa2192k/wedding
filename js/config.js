/**
 * ==========================================================================
 * WEDDING CONFIGURATION FILE
 * Bạn có thể dễ dàng thay đổi thông tin, hình ảnh và THEME tại file này.
 * ==========================================================================
 */

const WEDDING_CONFIG = {
  // 1. CẤU HÌNH THEME TÔNG MÀU
  // Các tùy chọn có sẵn:
  // - 'green' : Xanh rêu / Ô liu (mặc định theo bản thiết kế mẫu)
  // - 'gold'  : Vàng ánh kim / Hoàng gia sang trọng
  // - 'red'   : Đỏ truyền thống / Rượu vang Á Đông
  // - 'pink'  : Hồng pastel / Lãng mạn nhẹ nhàng
  // - 'navy'  : Xanh navy / Quý phái & hiện đại
  theme: 'green',

  // 2. THÔNG TIN CÔ DÂU & CHÚ RỂ
  groom: {
    name: 'Đức Hoà',
    fullName: 'Phạm Đức Hoà',
    parents: {
      father: 'Ông. Phạm Quốc Vang',
      mother: 'Bà. Nguyễn Thị Hoài'
    }
  },
  bride: {
    name: 'Khánh Huyền',
    fullName: 'Bùi Thị Khánh Huyền',
    parents: {
      father: 'Ông. Bùi Văn Thọ',
      mother: 'Bà. Nguyễn Thị Hồng'
    }
  },

  // 3. THỜI GIAN VÀ ĐỊA ĐIỂM CƯỚI (Định dạng: YYYY-MM-DDTHH:mm:ss)
  weddingDate: '2026-11-29T14:00:00',
  dateDisplay: {
    day: '28',
    month: '11',
    year: '2026',
    shortYear: '26',
    fullDateText: '17:00 | THỨ BẢY | 28.11.2026'
  },

  // Địa điểm tiệc Nhà Gái (Bên phải)
  venueBride: {
    name: 'TƯ GIA NHÀ GÁI',
    address: 'Xã Kiến Xương - Tỉnh Hưng Yên',
    time: '17:00 | THỨ BẢY | 28.11.2026',
    mapUrl: 'https://maps.app.goo.gl/CfB3AjW6Ad3YDYFQ8'
  },

  // Địa điểm tiệc Nhà Trai (Bên trái)
  venueGroom: {
    name: 'TƯ GIA NHÀ TRAI',
    address: 'Xã Bình Thanh - Tỉnh Hưng Yên',
    time: '17:00 | THỨ BẢY | 28.11.2026',
    mapUrl: 'https://maps.app.goo.gl/v3dikxQMnXr4cf4JA'
  },

  // Tương thích cấu hình đơn cũ
  venue: {
    name: 'TẠI TƯ GIA NHÀ TRAI',
    address: 'Xã Bình Thanh - Tỉnh Hưng Yên',
    mapUrl: 'https://maps.app.goo.gl/v3dikxQMnXr4cf4JA'
  },

  // 4. LỊCH TRÌNH TIỆC CƯỚI (TIMELINE)
  timeline: [
    { time: '16:00', title: 'ĐÓN TIẾP KHÁCH MỜI', icon: 'camera' },
    // { time: '16:30', title: 'CHỤP ẢNH ', icon: 'ring' },
    { time: '17:00', title: 'CHUNG VUI KHAI TIỆC', icon: 'dining' },
    { time: '18:30', title: 'THƯỞNG THỨC TIỆC NGỌT, ÂM NHẠC', icon: 'music' }
  ],

  // 5. ĐƯỜNG DẪN HÌNH ẢNH (Sử dụng toàn bộ bộ ảnh cưới thực tế từ assets/root_images/)
  images: {
    hero: 'assets/root_images/HNH03015.jpg',
    saveDateBg: 'assets/root_images/DRN00690.JPG',
    saveDate1: 'assets/root_images/HNH03393.JPG',
    saveDate2: 'assets/root_images/HNH03781.JPG',
    saveDate3: 'assets/root_images/DRN00773.jpg',
    saveDate4: 'assets/root_images/HNH02448.JPG',
    saveDate5: 'assets/root_images/HNH02441.JPG',
    saveDate6: 'assets/root_images/HNH02772.JPG',
    saveDate7: 'assets/root_images/HNH03834.JPG',
    saveDate8: 'assets/root_images/HNH02755.JPG',
    saveDate9: 'assets/root_images/HNH02915.JPG',
    coupleGroom: 'assets/root_images/HNH00660.JPG',
    coupleBride: 'assets/root_images/HNH00660.JPG',
    storyBanner: 'assets/root_images/HNH03680.JPG',
    thankYou: 'assets/root_images/DRN00563.JPG',
    gallery: [
      'assets/root_images/HNH00913.JPG',
      'assets/root_images/HNH03352.JPG',
      'assets/root_images/HNH00037.JPG',
      'assets/root_images/HNH00317.JPG',
      'assets/root_images/HNH00425.JPG',
      'assets/root_images/HNH03619.JPG',
      'assets/root_images/HNH01074.JPG',
      'assets/root_images/HNH00291.JPG',
      'assets/root_images/HNH00152.JPG',
      'assets/root_images/HNH00222.JPG'
    ]
  },

  // 6. NHẠC NỀN CƯỚI
  music: {
    enable: true,
    audioSrc: 'assets/audio/wedding-song.mp3'
  },

  // 7. THÔNG TIN MỪNG CƯỚI (QR / TÀI KHOẢN NGÂN HÀNG - Tùy chọn)
  giftBox: {
    enable: true,
    groomBank: {
      bankName: 'TP Bank',
      accountNumber: '90816962689',
      accountName: 'PHAM DUC HOA',
      qrImage: 'https://api.vietqr.io/image/TPB-90816962689-compact2.png?accountName=PHAM%20DUC%20HOA'
    },
    // brideBank: {
    //   bankName: 'Vietcombank',
    //   accountNumber: '1234567890',
    //   accountName: 'BUI THI KHANH HUYEN',
    //   qrImage: 'https://api.vietqr.io/image/970436-1234567890-compact2.png?amount=0&addInfo=Mung%20cuoi%20Khanh%20Huyen&accountName=BUI%20THI%20KHANH%20HUYEN'
    // }
  },

  // 8. CẤU HÌNH LƯU XÁC NHẬN THAM DỰ (RSVP -> GOOGLE SHEETS)
  // Dán link Web App (Google Apps Script) vào đây để tự động ghi danh sách khách vào Google Sheet
  rsvp: {
    googleSheetScriptUrl: 'https://script.google.com/macros/s/AKfycbxXWSlf_0ODsiOYpZ0nmd85YXBNxkEX9zmz_YGnmfEPyIaPbTgfHpK4H0NGwvyFnvJm/exec'
  },

  // 9. HIỆU ỨNG CÁNH HOA ANH ĐÀO RƠI (SAKURA EFFECT TOÀN APP)
  sakura: {
    enable: true,           // Bật/tắt hiệu ứng hoa rơi toàn app
    petalCount: 'auto',     // 'auto' hoặc số lượng cụ thể (mặc định: ~28 mobile, ~50 desktop)
    windSpeed: 0.7,         // Tốc độ gió thoảng ngang
    fallSpeed: 1.1,         // Tốc độ rơi nhẹ nhàng
    interactive: true       // Tương tác bay bổng khi di chuột hoặc vuốt ngón tay
  }
};

  