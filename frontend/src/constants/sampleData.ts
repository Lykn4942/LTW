import { Comic, FeaturedComic, Comment, RatingEmoji } from "@/types";

// ==================== Sample Comics ====================
export const hotComics: Comic[] = [
  { id: 1, title: "Võ Đạo Độc Tôn", cover: "https://picsum.photos/seed/comic1/300/400", chapter: "Chương 245", views: 15000, isNew: true },
  { id: 2, title: "Ta Là Vua", cover: "https://picsum.photos/seed/comic2/300/400", chapter: "Chương 189", views: 12000 },
  { id: 3, title: "Trọng Sinh Đô Thị", cover: "https://picsum.photos/seed/comic3/300/400", chapter: "Chương 312", views: 9800 },
  { id: 4, title: "Tiên Nghịch", cover: "https://picsum.photos/seed/comic4/300/400", chapter: "Chương 567", views: 8700, isNew: true },
  { id: 5, title: "Đấu La Đại Lục", cover: "https://picsum.photos/seed/comic5/300/400", chapter: "Chương 890", views: 7600, isNew: true },
  { id: 6, title: "Thần Ấn Vương Tọa", cover: "https://picsum.photos/seed/comic6/300/400", chapter: "Chương 456", views: 6500 },
];

export const newUpdatedComics: Comic[] = [
  { id: 7, title: "Đấu Phá Thương Khung", cover: "https://picsum.photos/seed/comic7/300/400", chapter: "Chương 1245", views: 25000, isNew: true },
  { id: 8, title: "Vạn Cổ Thần Đế", cover: "https://picsum.photos/seed/comic8/300/400", chapter: "Chương 321", views: 18000, isNew: true },
  { id: 9, title: "Nhất Niệm Vĩnh Hằng", cover: "https://picsum.photos/seed/comic9/300/400", chapter: "Chương 789", views: 14000, isNew: true },
  { id: 10, title: "Phàm Nhân Tu Tiên", cover: "https://picsum.photos/seed/comic10/300/400", chapter: "Chương 567", views: 11000, isNew: true },
  { id: 11, title: "Ngã Dục Phong Thiên", cover: "https://picsum.photos/seed/comic11/300/400", chapter: "Chương 234", views: 9500, isNew: true },
  { id: 12, title: "Tiên Vương", cover: "https://picsum.photos/seed/comic12/300/400", chapter: "Chương 678", views: 8200, isNew: true },
];

export const completedComics: Comic[] = [
  { id: 13, title: "Bách Luyện Thành Thần", cover: "https://picsum.photos/seed/comic13/300/400", chapter: "Chương 1500", views: 50000 },
  { id: 14, title: "Đại Chúa Tể", cover: "https://picsum.photos/seed/comic14/300/400", chapter: "Chương 890", views: 35000 },
  { id: 15, title: "Linh Vũ Thiên Hạ", cover: "https://picsum.photos/seed/comic15/300/400", chapter: "Chương 2100", views: 42000 },
  { id: 16, title: "Nguyên Tôn", cover: "https://picsum.photos/seed/comic16/300/400", chapter: "Chương 1300", views: 38000 },
  { id: 17, title: "Thôn Phệ Tinh Không", cover: "https://picsum.photos/seed/comic17/300/400", chapter: "Chương 1800", views: 45000 },
  { id: 18, title: "Vũ Động Càn Khôn", cover: "https://picsum.photos/seed/comic18/300/400", chapter: "Chương 1200", views: 40000 },
];

// ==================== Featured Comics ====================
export const featuredComics: FeaturedComic[] = [
  {
    id: 1,
    title: "Võ Đạo Độc Tôn",
    cover: "https://picsum.photos/seed/featured1/800/400",
    description: "Một thiếu niên với võ đạo vô song, bước đi trên con đường trở thành đệ nhất thiên hạ.",
    views: 1500000,
    followers: 850000,
    genre: "Văn học",
  },
  {
    id: 2,
    title: "Ta Là Vua",
    cover: "https://picsum.photos/seed/featured2/800/400",
    description: "Từ một kẻ vô danh, hắn vươn lên đỉnh cao quyền lực bằng trí tuệ và sức mạnh.",
    views: 1200000,
    followers: 720000,
    genre: "Lịch sử",
  },
  {
    id: 3,
    title: "Đấu La Đại Lục",
    cover: "https://picsum.photos/seed/featured3/800/400",
    description: "Hành trình của Đường Tam trong thế giới Đấu La, nơi võ hồn là sức mạnh.",
    views: 2000000,
    followers: 1500000,
    genre: "Nghệ thuật & Văn hóa",
  },
  {
    id: 4,
    title: "Thần Ấn Vương Tọa",
    cover: "https://picsum.photos/seed/featured4/800/400",
    description: "Câu chuyện về một chàng trai trẻ với sức mạnh của Thần Ấn huyền bí.",
    views: 980000,
    followers: 650000,
    genre: "Khoa học & Công nghệ",
  },
  {
    id: 5,
    title: "Vạn Cổ Thần Đế",
    cover: "https://picsum.photos/seed/featured5/800/400",
    description: "Một đế giả vạn cổ tái sinh, quyết tâm thay đổi định mệnh của mình.",
    views: 1800000,
    followers: 1100000,
    genre: "Tôn giáo & Triết học",
  },
];

// ==================== Sample Comments ====================
export const sampleComments: Comment[] = [
  {
    id: 1,
    username: "NguyenVanA",
    content: "Truyện hay quá! Đọc mãi không chán 😍",
    time: "5 phút trước",
    avatar: "🐱",
    comicId: 1,
    comicTitle: "Võ Đạo Độc Tôn",
  },
  {
    id: 2,
    username: "TranThiB",
    content: "Chờ chương mới mòn mỏi luôn...",
    time: "12 phút trước",
    avatar: "🐰",
    comicId: 2,
    comicTitle: "Ta Là Vua",
  },
  {
    id: 3,
    username: "LeVanC",
    content: "Main quá đỉnh! 🔥",
    time: "30 phút trước",
    avatar: "🐻",
    comicId: 1,
    comicTitle: "Võ Đạo Độc Tôn",
  },
  {
    id: 4,
    username: "PhamThiD",
    content: "Ai cũng nên đọc truyện này nha",
    time: "1 giờ trước",
    avatar: "🦊",
    comicId: 3,
    comicTitle: "Trọng Sinh Đô Thị",
  },
];

// ==================== Top Comics ====================
export const topViewsComics = [
  { rank: 1, title: "Võ Đạo Độc Tôn", chapter: "Chương 245", views: 150000 },
  { rank: 2, title: "Ta Là Vua", chapter: "Chương 189", views: 120000 },
  { rank: 3, title: "Trọng Sinh Đô Thị", chapter: "Chương 312", views: 98000 },
  { rank: 4, title: "Tiên Nghịch", chapter: "Chương 567", views: 87000 },
  { rank: 5, title: "Đấu Phá Thương Khung", chapter: "Chương 890", views: 76000 },
];

export const topFollowersComics = [
  { rank: 1, title: "Đấu La Đại Lục", chapter: "Chương 456", followers: 1500000 },
  { rank: 2, title: "Vạn Cổ Thần Đế", chapter: "Chương 321", followers: 1100000 },
  { rank: 3, title: "Võ Đạo Độc Tôn", chapter: "Chương 245", followers: 850000 },
  { rank: 4, title: "Thần Ấn Vương Tọa", chapter: "Chương 178", followers: 650000 },
  { rank: 5, title: "Ta Là Vua", chapter: "Chương 189", followers: 520000 },
];

// ==================== Search Comics ====================
export const searchableComics = [
  { id: 1, title: "Võ Đạo Độc Tôn" },
  { id: 2, title: "Ta Là Vua" },
  { id: 3, title: "Đấu La Đại Lục" },
  { id: 4, title: "Thần Ấn Vương Tọa" },
];

// ==================== Rating Emojis ====================
export const ratingEmojis: RatingEmoji[] = [
  { emoji: "😞", label: "Rất tệ", value: 1 },
  { emoji: "😕", label: "Tệ", value: 2 },
  { emoji: "😐", label: "Bình thường", value: 3 },
  { emoji: "😊", label: "Hay", value: 4 },
  { emoji: "😍", label: "Rất hay", value: 5 },
];
