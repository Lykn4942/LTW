import { useState, useEffect } from "react";
import { ChevronLeft, Upload, Image, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import { toast } from "@/hooks/use-toast";

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

const UploadComic = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [currentUser, setCurrentUser] = useState<{ username: string; isAdmin?: boolean; canUploadComics?: boolean } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      navigate("/login");
      return;
    }
    const userData = JSON.parse(user);
    
    // Check if user can upload comics
    if (!userData.isAdmin && !userData.canUploadComics) {
      toast({
        title: "Không có quyền",
        description: "Bạn cần được duyệt trước khi có thể đăng truyện",
        variant: "destructive",
      });
      navigate("/profile");
      return;
    }
    
    setCurrentUser(userData);
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || !selectedCategory || !coverUrl.trim()) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng điền đầy đủ thông tin",
        variant: "destructive",
      });
      return;
    }

    // Create new comic
    const newComic = {
      id: Date.now(),
      title,
      description,
      category: selectedCategory,
      cover: coverUrl,
      chapters: 0,
      createdAt: new Date().toLocaleDateString("vi-VN"),
    };

    // Save to user's comics
    const existingComics = JSON.parse(localStorage.getItem(`userComics_${currentUser?.username}`) || "[]");
    localStorage.setItem(`userComics_${currentUser?.username}`, JSON.stringify([...existingComics, newComic]));

    toast({
      title: "Đăng truyện thành công!",
      description: "Truyện của bạn đã được đăng lên",
    });

    navigate("/profile");
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="container py-6 max-w-2xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card hover:bg-muted transition-colors text-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Quay lại</span>
          </Link>
        </div>

        {/* Layout matching ComicDetail page */}
        <div className="bg-card rounded-2xl shadow-cute-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-6 border-b border-border">
            <h1 className="text-2xl font-display font-bold text-foreground">Đăng truyện mới</h1>
            <p className="text-muted-foreground text-sm mt-1">Điền thông tin để tạo truyện mới</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Comic Info Layout - matching ComicDetail */}
            <div className="flex gap-6 flex-col md:flex-row mb-8">
              {/* Cover Image - Left side like ComicDetail */}
              <div className="flex-shrink-0">
                <label className="block text-sm font-medium text-foreground mb-2">Ảnh bìa</label>
                {coverUrl ? (
                  <div className="relative w-40 aspect-[3/4] rounded-xl overflow-hidden shadow-cute group">
                    <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setCoverUrl("")}
                      className="absolute top-2 right-2 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-40 aspect-[3/4] rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center bg-muted/30">
                    <Image className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-xs text-muted-foreground text-center px-2">Nhập URL bên dưới</span>
                  </div>
                )}
                <input
                  type="url"
                  value={coverUrl}
                  onChange={(e) => setCoverUrl(e.target.value)}
                  placeholder="URL ảnh bìa..."
                  className="w-40 mt-2 px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Comic Info - Right side like ComicDetail */}
              <div className="flex-1 space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Tên truyện</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Nhập tên truyện..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-xl font-bold focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                {/* Other Name */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Tên khác (tùy chọn)</label>
                  <input
                    type="text"
                    placeholder="Tên khác của truyện..."
                    className="w-full px-4 py-2 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                {/* Author */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Tác giả:</span>
                  <span className="font-medium text-foreground">{currentUser?.username || "Bạn"}</span>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Thể loại</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2.5 pr-12 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23888%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center] bg-[length:1rem]"
                  >
                    <option value="">Chọn thể loại</option>
                    {categories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Trạng thái: <span className="text-primary font-medium">Đang tiến hành</span></span>
                  <span>•</span>
                  <span>0 chương</span>
                </div>
              </div>
            </div>

            {/* Description - Full width like summary in ComicDetail */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">Tóm tắt nội dung</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nhập tóm tắt nội dung truyện..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Upload className="h-5 w-5" />
              Đăng truyện
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UploadComic;
