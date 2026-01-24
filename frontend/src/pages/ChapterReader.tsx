import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, ChevronUp, ChevronDown, ArrowUp } from "lucide-react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample chapter content - in real app this would come from API
const chaptersData: Record<string, {
  comicId: number;
  comicTitle: string;
  chapters: { id: number; title: string; content: string[] }[];
}> = {
  "1": {
    comicId: 1,
    comicTitle: "Võ Đạo Độc Tôn",
    chapters: [
      {
        id: 1,
        title: "Chương 1: Khởi đầu",
        content: [
          "https://picsum.photos/seed/ch1-1/800/1200",
          "https://picsum.photos/seed/ch1-2/800/1200",
          "https://picsum.photos/seed/ch1-3/800/1200",
        ],
      },
      {
        id: 2,
        title: "Chương 2: Thức tỉnh",
        content: [
          "https://picsum.photos/seed/ch2-1/800/1200",
          "https://picsum.photos/seed/ch2-2/800/1200",
        ],
      },
      {
        id: 3,
        title: "Chương 3: Tu luyện",
        content: [
          "https://picsum.photos/seed/ch3-1/800/1200",
          "https://picsum.photos/seed/ch3-2/800/1200",
          "https://picsum.photos/seed/ch3-3/800/1200",
          "https://picsum.photos/seed/ch3-4/800/1200",
        ],
      },
    ],
  },
  "2": {
    comicId: 2,
    comicTitle: "Ta Là Vua",
    chapters: [
      {
        id: 1,
        title: "Chương 1: Vương giả trở lại",
        content: [
          "https://picsum.photos/seed/comic2-ch1-1/800/1200",
          "https://picsum.photos/seed/comic2-ch1-2/800/1200",
        ],
      },
      {
        id: 2,
        title: "Chương 2: Định mệnh",
        content: [
          "https://picsum.photos/seed/comic2-ch2-1/800/1200",
        ],
      },
    ],
  },
};

interface Comment {
  id: number;
  username: string;
  content: string;
  date: string;
}

const ChapterReader = () => {
  const { comicId, chapterId } = useParams<{ comicId: string; chapterId: string }>();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, username: "Reader1", content: "Chương này hay quá!", date: "26/12/2024" },
  ]);
  const [currentUser, setCurrentUser] = useState<{ username: string } | null>(null);

  const comicData = chaptersData[comicId || "1"] || chaptersData["1"];
  const currentChapterIndex = comicData.chapters.findIndex(
    (ch) => ch.id === parseInt(chapterId || "1")
  );
  const currentChapter = comicData.chapters[currentChapterIndex] || comicData.chapters[0];

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPrevChapter = () => {
    if (currentChapterIndex > 0) {
      navigate(`/comic/${comicId}/chapter/${comicData.chapters[currentChapterIndex - 1].id}`);
      scrollToTop();
    }
  };

  const goToNextChapter = () => {
    if (currentChapterIndex < comicData.chapters.length - 1) {
      navigate(`/comic/${comicId}/chapter/${comicData.chapters[currentChapterIndex + 1].id}`);
      scrollToTop();
    }
  };

  const handleChapterSelect = (value: string) => {
    navigate(`/comic/${comicId}/chapter/${value}`);
    scrollToTop();
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

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="container py-6">
        {/* Navigation Header */}
        <div className="bg-card rounded-2xl shadow-cute-lg p-4 mb-6">
          {/* Back & Title */}
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => navigate(`/comic/${comicId}`)}
              className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <Link
              to={`/comic/${comicId}`}
              className="text-lg font-display font-bold text-foreground hover:text-primary transition-colors"
            >
              {comicData.comicTitle} - {currentChapter.title}
            </Link>
          </div>

          {/* Chapter Select */}
          <div className="flex justify-center mb-4">
            <Select
              value={currentChapter.id.toString()}
              onValueChange={handleChapterSelect}
            >
              <SelectTrigger className="w-64 bg-muted border-border">
                <SelectValue placeholder="Chọn chương" />
              </SelectTrigger>
              <SelectContent>
                {comicData.chapters.map((chapter) => (
                  <SelectItem key={chapter.id} value={chapter.id.toString()}>
                    {chapter.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Prev/Next Buttons */}
          <div className="flex justify-center gap-3">
            <button
              onClick={goToPrevChapter}
              disabled={currentChapterIndex === 0}
              className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronUp className="h-4 w-4 inline mr-1" />
              Chương trước
            </button>
            <button
              onClick={goToNextChapter}
              disabled={currentChapterIndex === comicData.chapters.length - 1}
              className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Chương sau
              <ChevronDown className="h-4 w-4 inline ml-1" />
            </button>
          </div>
        </div>

        {/* Chapter Content */}
        <div className="bg-muted/50 rounded-2xl shadow-cute-lg p-4 mb-6">
          <div className="flex flex-col items-center gap-2">
            {currentChapter.content.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Page ${index + 1}`}
                className="max-w-full w-auto rounded-lg shadow-cute"
                loading="lazy"
              />
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bg-card rounded-2xl shadow-cute-lg p-4 mb-6">
          <div className="flex justify-center gap-3">
            <button
              onClick={goToPrevChapter}
              disabled={currentChapterIndex === 0}
              className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Chương trước
            </button>
            <Select
              value={currentChapter.id.toString()}
              onValueChange={handleChapterSelect}
            >
              <SelectTrigger className="w-40 bg-muted border-border">
                <SelectValue placeholder="List Chương" />
              </SelectTrigger>
              <SelectContent>
                {comicData.chapters.map((chapter) => (
                  <SelectItem key={chapter.id} value={chapter.id.toString()}>
                    {chapter.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <button
              onClick={goToNextChapter}
              disabled={currentChapterIndex === comicData.chapters.length - 1}
              className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Chương sau
            </button>
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

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-primary text-primary-foreground shadow-cute-lg hover:scale-110 transition-all animate-fade-in z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default ChapterReader;
