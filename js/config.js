const WEDDING_CONFIG = {

  theme: 'green',

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

  weddingDate: '2026-11-29T14:00:00',
  dateDisplay: {
    day: '29',
    month: '11',
    year: '2026',
    shortYear: '26',
    fullDateText: '17:00 | THỨ BẢY | 28.11.2026'
  },

  venueBride: {
    name: 'TƯ GIA NHÀ GÁI',
    address: 'Thôn Trà Hương - Xã Kiến Xương - Tỉnh Hưng Yên',
    time: '17:00 | THỨ BẢY | 28.11.2026',
    mapUrl: 'https://maps.app.goo.gl/CfB3AjW6Ad3YDYFQ8'
  },

  venueGroom: {
    name: 'TƯ GIA NHÀ TRAI',
    address: 'Thôn Quang Hưng - Xã Bình Thanh - Tỉnh Hưng Yên',
    time: '17:00 | THỨ BẢY | 28.11.2026',
    mapUrl: 'https://maps.app.goo.gl/v3dikxQMnXr4cf4JA'
  },

  venue: {
    name: 'TẠI TƯ GIA NHÀ TRAI',
    address: 'Thôn Quang Hưng - Xã Bình Thanh - Tỉnh Hưng Yên',
    mapUrl: 'https://maps.app.goo.gl/v3dikxQMnXr4cf4JA'
  },

  timeline: [
    { time: '16:00', title: 'ĐÓN TIẾP KHÁCH MỜI', icon: 'camera' },

    { time: '17:00', title: 'CHUNG VUI KHAI TIỆC', icon: 'dining' },
    { time: '18:30', title: 'THƯỞNG THỨC TIỆC NGỌT, ÂM NHẠC', icon: 'music' }
  ],

  images: {
    hero: 'assets/root_images/HNH03015.jpg',
    saveDate6: 'assets/root_images/HNH02786.jpg',
    saveDate1: 'assets/root_images/HNH03428.jpg',
    saveDate2: 'assets/root_images/HNH03545.jpg',
    saveDate3: 'assets/root_images/HNH03675.jpg',
    saveDate4: 'assets/root_images/DRN00570.jpg',
    saveDate5: 'assets/root_images/DRN00773.jpg',
    saveDate7: 'assets/root_images/HNH02590.jpg',
    saveDate8: 'assets/root_images/HNH02718.jpg',
    // saveDate9: 'assets/root_images/HNH02915.JPG',
    coupleGroom: 'assets/root_images/HNH00660.JPG',
    coupleBride: 'assets/root_images/HNH00660.JPG',
    storyBanner: 'assets/root_images/HNH03680.JPG',
    thankYou: 'assets/root_images/DRN00563.JPG',
    gallery: [
      'assets/root_images/HNH00913.JPG',
      'assets/root_images/HNH00317.JPG',
      'assets/root_images/HNH00037.JPG',
      'assets/root_images/HNH00222.JPG',
      'assets/root_images/HNH00013.JPG',
      // 'assets/root_images/HNH03619.JPG',
      // 'assets/root_images/HNH03428.jpg',
      // 'assets/root_images/HNH03545.jpg',
      // 'assets/root_images/HNH03792.jpg',
      // 'assets/root_images/HNH02590.jpg'
    ]
  },

  music: {
    enable: true,
    audioSrc: 'assets/audio/wedding-song.mp3'
  },

  giftBox: {
    enable: true,
    groomBank: {
      bankName: 'TP Bank',
      accountNumber: '90816962689',
      accountName: 'PHAM DUC HOA',
      qrImage: 'https://api.vietqr.io/image/TPB-90816962689-compact2.png?accountName=PHAM%20DUC%20HOA'
    },

  },

  rsvp: {
    googleSheetScriptUrl: 'https://script.google.com/macros/s/AKfycbxXWSlf_0ODsiOYpZ0nmd85YXBNxkEX9zmz_YGnmfEPyIaPbTgfHpK4H0NGwvyFnvJm/exec'
  },

  sakura: {
    enable: true,
    petalCount: 'auto',
    windSpeed: 0.7,
    fallSpeed: 1.1,
    interactive: true
  }
};
