export interface GalleryItem {
  id: string;
  src: string;
  caption: string;
  location?: string;
  date?: string;
}

export interface LoveReason {
  number: string;
  title: string;
  description: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface CardConfig {
  sender: string;
  receiver: string;
  anniversaryDate: string;
  badgeText: string;

  hero: {
    greetingPrefix: string;
    subtitle: string;
    dateBadge: string;
  };

  letter: {
    sectionBadge: string;
    title: string;
    paragraphs: string[];
    closing: string;
  };

  reasons: {
    sectionBadge: string;
    title: string;
    subtitle: string;
    items: LoveReason[];
  };

  timeline: {
    sectionBadge: string;
    title: string;
    subtitle: string;
    events: TimelineEvent[];
  };

  gallery: {
    sectionBadge: string;
    title: string;
    subtitle: string;
    photos: GalleryItem[];
  };

  gift: {
    sectionBadge: string;
    title: string;
    subtitle: string;
    boxLabel: string;
    revealedMessage: {
      headline: string;
      body: string;
      promise: string;
    };
  };

  finalMessage: {
    title: string;
    paragraphs: string[];
    signOff: string;
    signature: string;
    postscript: string;
  };

  music: {
    enabled: boolean;
    src: string;
    title: string;
    artist: string;
  };
}

export const cardConfig: CardConfig = {
  sender: 'Anh',
  receiver: 'Em',
  anniversaryDate: '20 • 10',
  badgeText: '20 • 10 • 2026',

  hero: {
    greetingPrefix: 'Gửi',
    subtitle: 'người con gái anh thương nhất',
    dateBadge: '20 / 10',
  },

  letter: {
    sectionBadge: 'Tâm thư gửi em',
    title: 'Anh muốn nói với em một điều...',
    paragraphs: [
      '20/10 này, anh không biết phải tặng em món quà gì mới đủ đặc biệt.',
      'Nên anh đã dành chút thời gian tỉ mẩn làm món quà nhỏ này, chỉ để em biết rằng...',
      'Có một người luôn muốn nhìn thấy em cười, luôn muốn ở bên cạnh che chở cho em, và luôn mong mọi điều dịu dàng, tốt đẹp nhất trên đời sẽ đến với em.',
      'Cảm ơn em vì đã bước vào cuộc đời anh. Cảm ơn vì những ngày bình yên ta bên nhau, những câu chuyện dài không dứt, những lần hờn dỗi vu vơ, và cả những khoảnh khắc rất đỗi giản đơn nhưng hễ có em lại trở nên vô cùng kỳ diệu.',
      'Chúc cô gái của anh một ngày 20/10 thật ngọt ngào, thật rực rỡ và luôn cảm thấy được yêu thương trọn vẹn.',
      'Và nếu có thể... hãy để anh được đồng hành cùng em không chỉ hôm nay, mà còn thật nhiều ngày 20/10 của những năm sau này nữa nhé.',
    ],
    closing: 'Thương em thật nhiều,',
  },

  reasons: {
    sectionBadge: 'Từ những điều giản dị',
    title: 'Có rất nhiều điều khiến anh thương em.',
    subtitle: 'Không phải vì những điều to tát, mà chính là những khoảnh khắc nhỏ bé này đây...',
    items: [
      {
        number: '01',
        title: 'Nụ cười của em',
        description: 'Mỗi khi nhìn thấy em cười tươi rạng rỡ, bao nhiêu mệt mỏi ngoài kia bỗng chốc tan biến hết.',
      },
      {
        number: '02',
        title: 'Cách em quan tâm người khác',
        description: 'Trái tim ấm áp và sự chu đáo, ân cần của em luôn làm anh thấy may mắn vì có em ở bên.',
      },
      {
        number: '03',
        title: 'Những lúc em trẻ con',
        description: 'Đôi mắt hờn dỗi đáng yêu và những câu nói bĩu môi khiến anh chỉ muốn ôm em vào lòng che chở.',
      },
      {
        number: '04',
        title: 'Cách em luôn nỗ lực',
        description: 'Sự kiên trì, chăm chỉ và bản lĩnh của em trong cuộc sống là điều anh vô cùng trân trọng và tự hào.',
      },
      {
        number: '05',
        title: 'Chỉ đơn giản là... em là chính em',
        description: 'Không cần hoàn hảo, chỉ cần là em trọn vẹn từng khoảnh khắc, đã là điều tuyệt vời nhất với anh rồi.',
      },
    ],
  },

  timeline: {
    sectionBadge: 'Hành trình của chúng ta',
    title: 'Từng cột mốc anh luôn gìn giữ',
    subtitle: 'Thời gian trôi qua, nhưng từng kỷ niệm bên em đều còn vẹn nguyên như ngày hôm qua.',
    events: [
      {
        date: 'Ngày đầu tiên',
        title: 'Ngày chúng ta vô tình gặp nhau',
        description: 'Khoảnh khắc ánh mắt chạm nhau, anh đã không ngờ rằng cô gái ấy sau này sẽ trở thành cả thế giới của anh.',
      },
      {
        date: 'Bước khởi đầu',
        title: 'Lần đầu tiên nói chuyện thâu đêm',
        description: 'Những tin nhắn kéo dài đến tận sáng hôm sau, nói đủ thứ chuyện trên đời mà không hề thấy chán.',
      },
      {
        date: 'Buổi hẹn hò',
        title: 'Lần đầu tiên đi chơi cùng nhau',
        description: 'Cảm giác bồi hồi, ngượng ngùng lúc đi dạo bên nhau, và cả cái chạm tay đầu tiên vụng về nhưng ấm áp lạ kỳ.',
      },
      {
        date: 'Hạnh phúc',
        title: 'Những ngày tháng bình yên bên nhau',
        description: 'Cùng nhau ăn những món giản dị, cùng ngắm hoàng hôn, chia sẻ với nhau từng niềm vui nhỏ nhặt trong ngày.',
      },
      {
        date: 'Thử thách',
        title: 'Những lần giận dỗi để hiểu nhau hơn',
        description: 'Dẫu có những bất đồng, nhưng sau tất cả ta nhận ra rằng mình trân quý và cần có nhau đến nhường nào.',
      },
      {
        date: 'Hôm nay & Mai sau',
        title: 'Và ngày hôm nay: 20/10 dành riêng cho em',
        description: 'Một ngày để anh nhắc nhớ em rằng, dù thời gian có qua đi, tình cảm này chỉ thêm sâu đậm theo từng ngày.',
        highlight: true,
      },
    ],
  },

  gallery: {
    sectionBadge: 'Khoảnh khắc đọng lại',
    title: 'Những khoảnh khắc anh muốn giữ lại thật lâu.',
    subtitle: 'Bởi vì mỗi bức hình đều chứa đựng nụ cười và ánh mắt mà anh yêu nhất trần đời.',
    photos: [
      {
        id: 'photo-1',
        src: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80',
        caption: 'Bó hoa hồng thơm ngát dành riêng cho người anh thương.',
        location: 'Kỷ niệm ngọt ngào',
        date: 'Mùa yêu',
      },
      {
        id: 'photo-2',
        src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80',
        caption: 'Cái nắm tay ấm áp đi qua từng góc phố nhỏ bình yên.',
        location: 'Chiều thu Hà Nội',
        date: 'Ngày hẹn hò',
      },
      {
        id: 'photo-3',
        src: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80',
        caption: 'Nụ cười tỏa nắng của em làm sáng bừng cả một ngày của anh.',
        location: 'Quán cà phê quen',
        date: 'Khoảnh khắc yêu',
      },
      {
        id: 'photo-4',
        src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        caption: 'Ánh nến lung linh và những lời thì thầm dịu dàng chỉ hai ta.',
        location: 'Bữa tối ấm cúng',
        date: 'Kỷ niệm đẹp',
      },
      {
        id: 'photo-5',
        src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Dù ở bất cứ đâu, ánh mắt anh vẫn luôn tìm kiếm hình bóng em.',
        location: 'Chuyến đi xa',
        date: 'Bên nhau',
      },
      {
        id: 'photo-6',
        src: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=80',
        caption: 'Cùng nhau ngắm hoàng hôn buông xuống, ước mong thời gian ngừng trôi.',
        location: 'Biển chiều êm đềm',
        date: 'Mãi mãi',
      },
    ],
  },

  gift: {
    sectionBadge: 'Hộp quà bí mật',
    title: 'Một món quà nhỏ giấu kín...',
    subtitle: 'Nếu có một điều ước anh có thể tặng em vào ngày hôm nay...',
    boxLabel: 'Chạm để mở món quà',
    revealedMessage: {
      headline: 'Món quà lớn nhất anh có thể trao...',
      body: '...thì đó chính là tất cả sự chân thành, lòng chung thủy và những ngày sau này sẽ luôn có anh ở bên cạnh chở che, lắng nghe và đồng hành cùng em vượt qua mọi bão giông.',
      promise: 'Dù cuộc sống có đổi thay, bàn tay này vẫn sẽ luôn nắm chặt tay em.',
    },
  },

  finalMessage: {
    title: 'Gửi cô gái của anh,',
    paragraphs: [
      'Anh không hứa rằng mọi ngày sau này của chúng mình đều sẽ hoàn hảo như trong truyện cổ tích.',
      'Nhưng anh hứa... anh sẽ luôn cố gắng hết mình để những ngày có anh bên cạnh em luôn là những ngày ấm áp, an tâm và ngập tràn tiếng cười.',
      'Chúc em một ngày 20/10 thật hạnh phúc, nhận được thật nhiều sự yêu thương mà em xứng đáng có được.',
    ],
    signOff: 'Yêu và thương em thật nhiều,',
    signature: '— Anh',
    postscript: 'Mãi mãi là điểm tựa bình yên của em.',
  },

  music: {
    enabled: true,
    src: '/music/love-song.mp3',
    title: 'Melody of Love',
    artist: 'For My Beloved',
  },
};
