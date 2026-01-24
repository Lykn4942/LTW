import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Eye, Star, Frown, Meh, Smile, Heart, Sparkles, BookmarkPlus, BookmarkCheck } from "lucide-react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Sample comic data - in real app this would come from API
const comicsData: Record<string, {
  id: number;
  title: string;
  otherName: string;
  author: string;
  genre: string[];
  status: string;
  rating: number;
  ratingCount: number;
  views: number;
  cover: string;
  summary: string;
  chapters: { id: number; title: string; uploader: string; date: string }[];
}> = {
  "1": {
    id: 1,
    title: "Võ Đạo Độc Tôn",
    otherName: "Martial Arts Sovereign",
    author: "Tác Giả A",
    genre: ["Hành động", "Fantasy"],
    status: "Đang tiến hành",
    rating: 0,
    ratingCount: 0,
    views: 15000,
    cover: "https://picsum.photos/seed/comic1/300/400",
    summary: "Một thiếu niên bị coi thường, một ngày nọ được truyền thừa võ đạo tối cổ, từ đó bắt đầu con đường trở thành võ đạo độc tôn thiên hạ.",
    chapters: [
      { id: 1, title: "Chương 1: Khởi đầu", uploader: "Admin", date: "25/12/2024" },
      { id: 2, title: "Chương 2: Thức tỉnh", uploader: "Admin", date: "25/12/2024" },
      { id: 3, title: "Chương 3: Tu luyện", uploader: "Mod1", date: "26/12/2024" },
    ],
  },
  "2": {
    id: 2,
    title: "Ta Là Vua",
    otherName: "I Am The King",
    author: "Tác Giả B",
    genre: ["Hành động", "Phiêu lưu"],
    status: "Đang tiến hành",
    rating: 4.5,
    ratingCount: 120,
    views: 12000,
    cover: "https://picsum.photos/seed/comic2/300/400",
    summary: "Câu chuyện về một chàng trai bình thường trở thành vua của một vương quốc cổ đại.",
    chapters: [
      { id: 1, title: "Chương 1: Vương giả trở lại", uploader: "Admin", date: "24/12/2024" },
      { id: 2, title: "Chương 2: Định mệnh", uploader: "Admin", date: "25/12/2024" },
    ],
  },
};

const ratingEmojis = [
  { value: 1, icon: Frown, label: "Dở", color: "text-red-500" },
  { value: 2, icon: Meh, label: "Tạm ổn", color: "text-orange-500" },
  { value: 3, icon: Smile, label: "Bình thường", color: "text-yellow-500" },
  { value: 4, icon: Heart, label: "Hay", color: "text-pink-500" },
  { value: 5, icon: Sparkles, label: "Rất hay", color: "text-purple-500" },
];

interface Comment {
  id: number;
  username: string;
  content: string;
  date: string;
}

const ComicDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, username: "User1", content: "Truyện hay quá!", date: "25/12/2024" },
    { id: 2, username: "User2", content: "Mong chờ chương mới!", date: "26/12/2024" },
  ]);
  const [currentUser, setCurrentUser] = useState<{ username: string } | null>(null);
  const [isFollowed, setIsFollowed] = useState(false);
  const [isHoveringCover, setIsHoveringCover] = useState(false);

  const comic = comicsData[id || "1"] || comicsData["1"];

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    // Check if comic is followed
    const storage = currentUser ? localStorage : sessionStorage;
    const followedComics = JSON.parse(storage.getItem("followedComics") || "[]");
    setIsFollowed(followedComics.some((c: { id: number }) => c.id === comic.id));
  }, [currentUser, comic.id]);

  const handleToggleFollow = () => {
    const storage = currentUser ? localStorage : sessionStorage;
    const followedComics = JSON.parse(storage.getItem("followedComics") || "[]");
    
    if (isFollowed) {
      const updated = followedComics.filter((c: { id: number }) => c.id !== comic.id);
      storage.setItem("followedComics", JSON.stringify(updated));
      setIsFollowed(false);
    } else {
      const newFollowed = {
        id: comic.id,
        title: comic.title,
        cover: comic.cover,
      };
      storage.setItem("followedComics", JSON.stringify([...followedComics, newFollowed]));
      setIsFollowed(true);
    }
  };

  const handleRating = (value: number) => {
    if (!currentUser) {
      setShowLoginDialog(true);
      return;
    }
    setSelectedRating(value);
    // In real app, save rating to backend
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    if (!comment.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      username: currentUser.username,
      content: comment,
      date: new Date().toLocaleDateString("vi-VN"),
    };
    setComments([newComment, ...comments]);
    setComment("");
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${i <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Pink Header */}
      <div className="h-16 bg-primary/30" />

      <main className="container py-6 -mt-12">
        {/* Back Button & Title */}
        <div className="flex items-center gap-2 mb-4">
          <Link
            to="/"
            className="p-2 rounded-lg bg-card hover:bg-muted transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </Link>
          <h1 className="text-xl font-display font-bold text-foreground">{comic.title}</h1>
        </div>

        {/* Comic Info Card */}
        <div className="bg-card rounded-2xl shadow-cute-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Cover with follow button - like reference image */}
            <div className="w-40 flex-shrink-0 mx-auto sm:mx-0">
              <img
                src={comic.cover}
                alt={comic.title}
                className="w-full rounded-xl shadow-cute"
              />
              {/* Follow Button - Always visible below cover */}
              <button
                onClick={handleToggleFollow}
                className={`w-full mt-2 py-2 rounded-lg font-medium text-sm transition-all ${
                  isFollowed
                    ? "bg-muted text-foreground hover:bg-muted/80"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {isFollowed ? "Bỏ Theo Dõi" : "Theo Dõi"}
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-2">
              <p className="text-sm">
                <span className="text-muted-foreground">Tên khác: </span>
                <span className="text-foreground">{comic.otherName}</span>
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">Tác giả: </span>
                <span className="text-foreground">{comic.author}</span>
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">Thể loại: </span>
                <span className="text-foreground">{comic.genre.join(", ")}</span>
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">Tình trạng: </span>
                <span className="text-foreground">{comic.status}</span>
              </p>
              <p className="text-sm flex items-center gap-1">
                <span className="text-muted-foreground">Đánh giá: </span>
                <span className="flex items-center gap-0.5">{renderStars(comic.rating)}</span>
                <span className="text-foreground">
                  ({comic.ratingCount > 0 ? comic.rating.toFixed(1) : "0"} sao)
                </span>
              </p>
              <p className="text-sm flex items-center gap-1">
                <span className="text-muted-foreground">Lượt đọc: </span>
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">
                  {comic.views >= 1000 ? `${(comic.views / 1000).toFixed(1)}k` : comic.views}
                </span>
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Link
                  to={`/comic/${comic.id}/chapter/1`}
                  className="flex-1 py-2 text-center rounded-lg bg-muted hover:bg-muted/80 text-foreground font-medium transition-all"
                >
                  Đọc từ đầu
                </Link>
                <Link
                  to={`/comic/${comic.id}/chapter/${comic.chapters.length}`}
                  className="flex-1 py-2 text-center rounded-lg bg-muted hover:bg-muted/80 text-foreground font-medium transition-all"
                >
                  Đọc mới nhất
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-card rounded-2xl shadow-cute-lg p-6 mb-6">
          <h2 className="font-display font-bold text-foreground mb-3">Tóm tắt truyện</h2>
          <p className="text-foreground/80 text-sm leading-relaxed">{comic.summary}</p>
        </div>

        {/* Chapter List */}
        <div className="bg-card rounded-2xl shadow-cute-lg p-6 mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-sm font-medium text-muted-foreground">Chương</th>
                  <th className="text-left py-2 px-3 text-sm font-medium text-muted-foreground">Người đăng</th>
                  <th className="text-left py-2 px-3 text-sm font-medium text-muted-foreground">Ngày cập nhật</th>
                </tr>
              </thead>
              <tbody>
                {comic.chapters.map((chapter) => (
                  <tr key={chapter.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                    <td className="py-2 px-3">
                      <Link
                        to={`/comic/${comic.id}/chapter/${chapter.id}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {chapter.title}
                      </Link>
                    </td>
                    <td className="py-2 px-3 text-sm text-foreground/80">{chapter.uploader}</td>
                    <td className="py-2 px-3 text-sm text-foreground/80">{chapter.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rating Section */}
        <div className="bg-card rounded-2xl shadow-cute-lg p-6 mb-6">
          <h2 className="font-display font-bold text-foreground mb-4">Đánh giá truyện</h2>
          <div className="flex justify-center gap-4">
            {ratingEmojis.map((emoji) => {
              const Icon = emoji.icon;
              return (
                <button
                  key={emoji.value}
                  onClick={() => handleRating(emoji.value)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all hover:scale-110 ${
                    selectedRating === emoji.value
                      ? "bg-primary/20 ring-2 ring-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  <Icon className={`h-8 w-8 ${emoji.color}`} />
                  <span className="text-xs text-muted-foreground">{emoji.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-card rounded-2xl shadow-cute-lg p-6">
          <h2 className="font-display font-bold text-foreground mb-4">Bình luận</h2>

          {/* Comment Form */}
          {currentUser ? (
            <form onSubmit={handleComment} className="mb-6">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Viết bình luận của bạn..."
                className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                rows={3}
              />
              <button
                type="submit"
                className="mt-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all"
              >
                Gửi bình luận
              </button>
            </form>
          ) : (
            <div className="text-center py-6 border border-dashed border-border rounded-lg mb-6">
              <p className="text-muted-foreground">
                <Link to="/login" className="text-primary hover:underline">
                  Đăng nhập
                </Link>{" "}
                để bình luận
              </p>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c.id} className="p-4 rounded-lg bg-muted/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-foreground">{c.username}</span>
                  <span className="text-xs text-muted-foreground">{c.date}</span>
                </div>
                <p className="text-sm text-foreground/80">{c.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      {/* Login Required Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">Thông báo</DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <p className="text-foreground mb-4">Bạn cần có tài khoản để đánh giá truyện</p>
            <div className="flex gap-3 justify-center">
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/80 transition-all"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ComicDetail;