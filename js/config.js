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
    day: '29',
    month: '11',
    year: '2026',
    shortYear: '26',
    fullDateText: '14:00 | CHỦ NHẬT | 29.11.2026'
  },

  venue: {
    name: 'TẠI TƯ GIA NHÀ TRAI',
    address: 'Xã Bình Thanh - Tỉnh Hưng Yên',
    mapUrl: 'https://maps.app.goo.gl/v3dikxQMnXr4cf4JA'
  },

  // 4. LỊCH TRÌNH TIỆC CƯỚI (TIMELINE)
  timeline: [
    { time: '14:00', title: 'ĐÓN TIẾP KHÁCH MỜI', icon: 'camera' },
    { time: '14:30', title: 'BẮT ĐẦU LỄ THÀNH HÔN', icon: 'ring' },
    { time: '15:00', title: 'CHUNG VUI KHAI TIỆC', icon: 'dining' },
    { time: '16:30', title: 'MINI GAME VÀ KHIÊU VŨ', icon: 'music' }
  ],

  // 5. ĐƯỜNG DẪN HÌNH ẢNH (Các ảnh tạm thời được lưu trong assets/images/)
  // Khi bạn có ảnh cưới thật, chỉ cần copy vào assets/images/ và sửa đường dẫn ở đây!
  images: {
    hero: 'assets/images/hero.jpg',
    saveDateBg: 'assets/images/save_date_bg.jpg',
    saveDate1: 'assets/images/save_date_1.jpg',
    saveDate2: 'assets/images/save_date_2.jpg',
    saveDate3: 'assets/images/save_date_3.jpg',
    coupleGroom: 'assets/images/couple_groom.jpg',
    coupleBride: 'assets/images/couple_bride.jpg',
    gallery: [
      'assets/images/gallery_1.jpg',
      'assets/images/gallery_2.jpg',
      'assets/images/gallery_3.jpg',
      'assets/images/gallery_4.jpg',
      'assets/images/gallery_5.jpg',
      'assets/images/gallery_6.jpg',
      'assets/images/gallery_7.jpg',
      'assets/images/save_date_1.jpg'
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
      bankName: 'MB Bank',
      accountNumber: '0987654321',
      accountName: 'PHAM DUC HOA',
      qrImage: 'https://api.vietqr.io/image/970422-0987654321-compact2.png?amount=0&addInfo=Mung%20cuoi%20Duc%20Hoa&accountName=PHAM%20DUC%20HOA'
    },
    brideBank: {
      bankName: 'Vietcombank',
      accountNumber: '1234567890',
      accountName: 'BUI THI KHANH HUYEN',
      qrImage: 'https://api.vietqr.io/image/970436-1234567890-compact2.png?amount=0&addInfo=Mung%20cuoi%20Khanh%20Huyen&accountName=BUI%20THI%20KHANH%20HUYEN'
    }
  },

  // 8. CẤU HÌNH LƯU XÁC NHẬN THAM DỰ (RSVP -> GOOGLE SHEETS)
  // Dán link Web App (Google Apps Script) vào đây để tự động ghi danh sách khách vào Google Sheet
  rsvp: {
    googleSheetScriptUrl: ''
  }
};
