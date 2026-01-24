import { useState, useEffect } from "react";
import { ChevronLeft, Plus, Trash2, BookOpen, Eye, Edit, Save, X, Image } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import { toast } from "@/hooks/use-toast";

interface Chapter {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

interface UserComic {
  id: number;
  title: string;
  cover: string;
  description: string;
  category: string;
  chapters: number;
  createdAt: string;
  chapterList?: Chapter[];
  author?: string;
  status?: string;
}

const categories = [
  { name: "Văn học", slug: "van-hoc" },
  { name: "Lịch sử", slug: "lich-su" },
  { name: "Nghệ thuật & Văn hóa", slug: "nghe-thuat-van-hoa" },
  { name: "Khoa học & Công nghệ", slug: "khoa-hoc-cong-nghe" },
  { name: "Khoa học xã hội", slug: "khoa-hoc-xa-hoi" },
  { name: "Tôn giáo & Triết học", slug: "ton-giao-triet-hoc" },
  { name: "Lối sống & Sở thích", slug: "loi-song-so-thich" },
  { name: "Sức khỏe & Y học", slug: "suc-khoe-y-hoc" },
  { name: "Giáo dục & Tham khảo", slug: "giao-duc-tham-khao" },
];

const ManageComic = () => {
  const { id } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comic, setComic] = useState<UserComic | null>(null);
  const [showAddChapter, setShowAddChapter] = useState(false);
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterContent, setChapterContent] = useState("");
  const [currentUser, setCurrentUser] = useState<{ username: string } | null>(null);
  const navigate = useNavigate();

  // View/Edit chapter state
  const [viewingChapter, setViewingChapter] = useState<Chapter | null>(null);
  const [isEditingChapter, setIsEditingChapter] = useState(false);
  const [editChapterTitle, setEditChapterTitle] = useState("");
  const [editChapterContent, setEditChapterContent] = useState("");

  // Edit comic info state
  const [isEditingComic, setIsEditingComic] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editCover, setEditCover] = useState("");
  const [editStatus, setEditStatus] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      navigate("/login");
      return;
    }
    const userData = JSON.parse(user);
    setCurrentUser(userData);

    // Load comic
    const userComics = JSON.parse(localStorage.getItem(`userComics_${userData.username}`) || "[]");
    const foundComic = userComics.find((c: UserComic) => c.id === Number(id));
    
    if (!foundComic) {
      navigate("/profile");
      return;
    }
    
    setComic(foundComic);
  }, [id, navigate]);

  const handleAddChapter = () => {
    if (!chapterTitle.trim() || !chapterContent.trim()) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng nhập tiêu đề và nội dung chương",
        variant: "destructive",
      });
      return;
    }

    const newChapter: Chapter = {
      id: Date.now(),
      title: chapterTitle,
      content: chapterContent,
      createdAt: new Date().toLocaleDateString("vi-VN"),
    };

    // Update comic with new chapter
    const userComics = JSON.parse(localStorage.getItem(`userComics_${currentUser?.username}`) || "[]");
    const updatedComics = userComics.map((c: UserComic) => {
      if (c.id === Number(id)) {
        return {
          ...c,
          chapters: (c.chapters || 0) + 1,
          chapterList: [...(c.chapterList || []), newChapter],
        };
      }
      return c;
    });

    localStorage.setItem(`userComics_${currentUser?.username}`, JSON.stringify(updatedComics));
    
    // Update local state
    setComic(prev => prev ? {
      ...prev,
      chapters: (prev.chapters || 0) + 1,
      chapterList: [...(prev.chapterList || []), newChapter],
    } : null);

    setChapterTitle("");
    setChapterContent("");
    setShowAddChapter(false);

    toast({
      title: "Thêm chương thành công!",
      description: `Đã thêm ${newChapter.title}`,
    });
  };

  const handleDeleteChapter = (chapterId: number) => {
    const userComics = JSON.parse(localStorage.getItem(`userComics_${currentUser?.username}`) || "[]");
    const updatedComics = userComics.map((c: UserComic) => {
      if (c.id === Number(id)) {
        return {
          ...c,
          chapters: Math.max(0, (c.chapters || 0) - 1),
          chapterList: (c.chapterList || []).filter((ch: Chapter) => ch.id !== chapterId),
        };
      }
      return c;
    });

    localStorage.setItem(`userComics_${currentUser?.username}`, JSON.stringify(updatedComics));
    
    setComic(prev => prev ? {
      ...prev,
      chapters: Math.max(0, (prev.chapters || 0) - 1),
      chapterList: (prev.chapterList || []).filter(ch => ch.id !== chapterId),
    } : null);

    toast({ title: "Đã xóa chương" });
  };

  const handleViewChapter = (chapter: Chapter) => {
    setViewingChapter(chapter);
    setIsEditingChapter(false);
  };

  const handleEditChapter = (chapter: Chapter) => {
    setViewingChapter(chapter);
    setIsEditingChapter(true);
    setEditChapterTitle(chapter.title);
    setEditChapterContent(chapter.content);
  };

  const handleSaveChapter = () => {
    if (!viewingChapter || !editChapterTitle.trim() || !editChapterContent.trim()) {
      toast({ title: "Vui lòng điền đầy đủ thông tin", variant: "destructive" });
      return;
    }

    const userComics = JSON.parse(localStorage.getItem(`userComics_${currentUser?.username}`) || "[]");
    const updatedComics = userComics.map((c: UserComic) => {
      if (c.id === Number(id)) {
        return {
          ...c,
          chapterList: (c.chapterList || []).map((ch: Chapter) =>
            ch.id === viewingChapter.id
              ? { ...ch, title: editChapterTitle, content: editChapterContent }
              : ch
          ),
        };
      }
      return c;
    });

    localStorage.setItem(`userComics_${currentUser?.username}`, JSON.stringify(updatedComics));

    setComic(prev => prev ? {
      ...prev,
      chapterList: (prev.chapterList || []).map(ch =>
        ch.id === viewingChapter.id
          ? { ...ch, title: editChapterTitle, content: editChapterContent }
          : ch
      ),
    } : null);

    toast({ title: "Đã cập nhật chương" });
    setViewingChapter(null);
    setIsEditingChapter(false);
  };

  const handleStartEditComic = () => {
    if (!comic) return;
    setIsEditingComic(true);
    setEditTitle(comic.title);
    setEditDescription(comic.description);
    setEditCategory(comic.category);
    setEditCover(comic.cover);
    setEditStatus(comic.status || "ongoing");
  };

  const handleSaveComic = () => {
    if (!editTitle.trim() || !editDescription.trim()) {
      toast({ title: "Vui lòng điền đầy đủ thông tin", variant: "destructive" });
      return;
    }

    const userComics = JSON.parse(localStorage.getItem(`userComics_${currentUser?.username}`) || "[]");
    const updatedComics = userComics.map((c: UserComic) => {
      if (c.id === Number(id)) {
        return {
          ...c,
          title: editTitle,
          description: editDescription,
          category: editCategory,
          cover: editCover,
          status: editStatus,
        };
      }
      return c;
    });

    localStorage.setItem(`userComics_${currentUser?.username}`, JSON.stringify(updatedComics));

    setComic(prev => prev ? {
      ...prev,
      title: editTitle,
      description: editDescription,
      category: editCategory,
      cover: editCover,
      status: editStatus,
    } : null);

    toast({ title: "Đã cập nhật thông tin truyện" });
    setIsEditingComic(false);
  };

  const handleDeleteComic = () => {
    if (!confirm("Bạn có chắc muốn xóa truyện này? Thao tác này không thể hoàn tác.")) return;

    const userComics = JSON.parse(localStorage.getItem(`userComics_${currentUser?.username}`) || "[]");
    const updatedComics = userComics.filter((c: UserComic) => c.id !== Number(id));
    localStorage.setItem(`userComics_${currentUser?.username}`, JSON.stringify(updatedComics));

    toast({ title: "Đã xóa truyện" });
    navigate("/profile");
  };

  const getCategoryName = (slug: string) => {
    const cat = categories.find(c => c.slug === slug);
    return cat ? cat.name : slug;
  };

  if (!comic) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="container py-6">
        {/* Back Button */}
        <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card hover:bg-muted transition-colors text-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Quay lại</span>
          </Link>
          <button
            onClick={handleDeleteComic}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Xóa truyện</span>
          </button>
        </div>

        {/* Comic Info */}
        <div className="bg-card rounded-2xl shadow-cute-lg p-6 mb-6">
          {isEditingComic ? (
            <div className="space-y-4">
              <div className="flex gap-6 flex-col sm:flex-row">
                <div className="flex-shrink-0">
                  {editCover && (
                    <img src={editCover} alt="Cover" className="w-32 aspect-[3/4] object-cover rounded-xl mb-2" />
                  )}
                  <input
                    type="url"
                    value={editCover}
                    onChange={(e) => setEditCover(e.target.value)}
                    placeholder="URL ảnh bìa"
                    className="w-32 px-2 py-1.5 text-xs rounded-lg border border-border bg-background text-foreground"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Tên truyện</label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-border bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Thể loại</label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full px-4 py-2 pr-10 rounded-xl border border-border bg-background text-foreground appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23888%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem]"
                    >
                      {categories.map((cat) => (
                        <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Trạng thái</label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      className="w-full px-4 py-2 pr-10 rounded-xl border border-border bg-background text-foreground appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23888%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem]"
                    >
                      <option value="ongoing">Đang tiến hành</option>
                      <option value="completed">Hoàn thành</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Mô tả</label>
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 rounded-xl border border-border bg-background text-foreground resize-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsEditingComic(false)}
                      className="px-4 py-2 rounded-xl border border-border text-foreground hover:bg-muted"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleSaveComic}
                      className="px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-6 flex-col sm:flex-row">
              <img
                src={comic.cover}
                alt={comic.title}
                className="w-32 aspect-[3/4] object-cover rounded-xl flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                  <h1 className="text-2xl font-display font-bold text-foreground">{comic.title}</h1>
                  <button
                    onClick={handleStartEditComic}
                    className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    title="Chỉnh sửa thông tin"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                  {getCategoryName(comic.category)}
                </span>
                <p className="text-muted-foreground mb-4 line-clamp-3">{comic.description}</p>
                <p className="text-sm text-muted-foreground">
                  {comic.chapters || 0} chương • Đăng ngày {comic.createdAt}
                  {comic.status && ` • ${comic.status === "completed" ? "Hoàn thành" : "Đang tiến hành"}`}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Chapters List */}
        <div className="bg-card rounded-2xl shadow-cute-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-bold text-foreground">Danh sách chương</h2>
            <button
              onClick={() => setShowAddChapter(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Thêm chương
            </button>
          </div>

          {(comic.chapterList?.length || 0) === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Chưa có chương nào</p>
              <p className="text-sm mt-2">Bấm nút "Thêm chương" để bắt đầu!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {comic.chapterList?.map((chapter, index) => (
                <div key={chapter.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Chương {index + 1}: {chapter.title}</p>
                    <p className="text-xs text-muted-foreground">Đăng ngày {chapter.createdAt}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewChapter(chapter)}
                      className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      title="Xem chương"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEditChapter(chapter)}
                      className="p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                      title="Sửa chương"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteChapter(chapter.id)}
                      className="p-2 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
                      title="Xóa chương"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add Chapter Modal */}
      {showAddChapter && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddChapter(false)}>
          <div className="bg-card rounded-2xl shadow-cute-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display font-bold text-foreground">Thêm chương mới</h3>
              <button onClick={() => setShowAddChapter(false)} className="p-1.5 rounded-lg hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tiêu đề chương</label>
                <input
                  type="text"
                  value={chapterTitle}
                  onChange={(e) => setChapterTitle(e.target.value)}
                  placeholder="VD: Khởi đầu mới"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nội dung</label>
                <textarea
                  value={chapterContent}
                  onChange={(e) => setChapterContent(e.target.value)}
                  placeholder="Nhập nội dung chương..."
                  rows={10}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddChapter(false)}
                  className="flex-1 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-muted transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleAddChapter}
                  className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  Thêm chương
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View/Edit Chapter Modal */}
      {viewingChapter && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4" onClick={() => setViewingChapter(null)}>
          <div className="bg-card rounded-2xl shadow-cute-lg max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              {isEditingChapter ? (
                <input
                  type="text"
                  value={editChapterTitle}
                  onChange={(e) => setEditChapterTitle(e.target.value)}
                  className="text-xl font-display font-bold text-foreground bg-transparent border-b border-primary focus:outline-none flex-1 mr-4"
                />
              ) : (
                <h3 className="text-xl font-display font-bold text-foreground">{viewingChapter.title}</h3>
              )}
              <button onClick={() => setViewingChapter(null)} className="p-1.5 rounded-lg hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {isEditingChapter ? (
              <div className="space-y-4">
                <textarea
                  value={editChapterContent}
                  onChange={(e) => setEditChapterContent(e.target.value)}
                  rows={15}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => { setIsEditingChapter(false); setViewingChapter(null); }}
                    className="flex-1 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-muted transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSaveChapter}
                    className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap bg-muted/30 p-4 rounded-xl">
                {viewingChapter.content}
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ManageComic;
