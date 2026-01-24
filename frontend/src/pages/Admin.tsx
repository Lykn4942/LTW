import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BarChart3, Users, MessageSquare, FileText, Check, X, Eye, Trash2, ChevronLeft, BookOpen, Send, Plus, Bell } from "lucide-react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { toast } from "@/hooks/use-toast";

interface Form {
  id: number;
  type: "comic" | "ads" | "help";
  name: string;
  email: string;
  message?: string;
  date: string;
  status: "pending" | "approved" | "replied";
  username?: string;
}

interface Comment {
  id: number;
  username: string;
  content: string;
  comicTitle: string;
  comicId: number;
  date: string;
}

interface UserComic {
  id: number;
  title: string;
  cover: string;
  chapters: number;
  author: string;
  createdAt: string;
}

interface AdminNotification {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const sampleForms: Form[] = [
  { id: 1, type: "comic", name: "User1", email: "user1@email.com", message: "Tôi muốn đăng truyện mới lên website. Tôi đã có sẵn bản thảo và artwork.", date: "28/12/2024", status: "pending", username: "user1" },
  { id: 2, type: "ads", name: "Company A", email: "ads@company.com", message: "Chúng tôi muốn đặt banner quảng cáo trên trang chủ. Xin liên hệ để thảo luận về giá cả và vị trí.", date: "27/12/2024", status: "pending" },
  { id: 3, type: "help", name: "User2", email: "user2@email.com", message: "Không thể đọc chương mới của truyện Võ Đạo Độc Tôn. Trang báo lỗi 404 khi tôi click vào.", date: "26/12/2024", status: "pending" },
];

const sampleComments: Comment[] = [
  { id: 1, username: "User1", content: "Truyện hay quá!", comicTitle: "Võ Đạo Độc Tôn", comicId: 1, date: "28/12/2024" },
  { id: 2, username: "User2", content: "Mong chờ chương tiếp", comicTitle: "Ta Là Vua", comicId: 2, date: "27/12/2024" },
];

const sampleUserComics: UserComic[] = [
  { id: 100, title: "Truyện Test User", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300", chapters: 5, author: "user1", createdAt: "25/12/2024" },
];

const Admin = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "forms" | "comments" | "usercomics">("overview");
  const [forms, setForms] = useState<Form[]>(sampleForms);
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [userComics, setUserComics] = useState<UserComic[]>(sampleUserComics);
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [adminNotifications, setAdminNotifications] = useState<AdminNotification[]>([
    { id: 1, title: "Form mới", message: "Có 3 form mới cần xử lý", date: new Date().toLocaleDateString("vi-VN"), read: false },
  ]);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      navigate("/login");
      return;
    }
    const userData = JSON.parse(user);
    if (!userData.isAdmin) {
      navigate("/");
    }
  }, [navigate]);

  const handleApproveForm = (id: number) => {
    const form = forms.find(f => f.id === id);
    if (form && form.username) {
      // Mark user as approved to upload comics
      const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      const updatedUsers = users.map((u: { username: string }) => 
        u.username === form.username ? { ...u, canUploadComics: true } : u
      );
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
    }
    
    setForms(forms.map(f => f.id === id ? { ...f, status: "approved" } : f));
    toast({ title: "Đã duyệt form đăng truyện", description: "User có thể đăng truyện từ bây giờ" });
  };

  const handleOpenAdsForm = (form: Form) => {
    setSelectedForm(form);
    setContactMessage("");
  };

  const handleOpenHelpForm = (form: Form) => {
    setSelectedForm(form);
    setReplyMessage("");
  };

  const handleSendContactMessage = () => {
    if (!contactMessage.trim()) return;
    
    setForms(forms.map(f => f.id === selectedForm?.id ? { ...f, status: "replied" } : f));
    toast({ 
      title: "Đã gửi tin nhắn liên hệ", 
      description: `Đã gửi email đến ${selectedForm?.email}` 
    });
    setSelectedForm(null);
    setContactMessage("");
  };

  const handleSendReply = () => {
    if (!replyMessage.trim()) return;
    
    setForms(forms.map(f => f.id === selectedForm?.id ? { ...f, status: "replied" } : f));
    toast({ 
      title: "Đã gửi phản hồi", 
      description: `Đã gửi email đến ${selectedForm?.email}` 
    });
    setSelectedForm(null);
    setReplyMessage("");
  };

  const handleDeleteComment = (id: number) => {
    setComments(comments.filter(c => c.id !== id));
    toast({ title: "Đã xóa bình luận" });
  };

  const handleDeleteUserComicChapter = (comicId: number) => {
    setUserComics(userComics.filter(c => c.id !== comicId));
    toast({ title: "Đã xóa truyện", description: "Truyện đã bị xóa do vi phạm" });
  };

  const unreadNotifications = adminNotifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="container py-6">
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/")} className="p-2 rounded-lg bg-card hover:bg-muted transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-display font-bold text-foreground">Trang Quản Trị</h1>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Upload Comic Button for Admin */}
            <Link
              to="/upload-comic"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Đăng truyện</span>
            </Link>
            
            {/* Notifications indicator */}
            <div className="relative">
              <button 
                onClick={() => {
                  setAdminNotifications(prev => prev.map(n => ({ ...n, read: true })));
                  toast({
                    title: "Thông báo",
                    description: adminNotifications.length > 0 
                      ? adminNotifications.map(n => n.message).join(", ")
                      : "Không có thông báo mới",
                  });
                }}
                className="p-2 rounded-lg bg-card hover:bg-muted transition-colors"
              >
                <Bell className="h-5 w-5" />
              </button>
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: "overview", label: "Tổng quan", icon: BarChart3 },
            { id: "forms", label: "Forms gửi về", icon: FileText },
            { id: "comments", label: "Bình luận", icon: MessageSquare },
            { id: "usercomics", label: "Truyện User đăng", icon: BookOpen },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-muted"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card rounded-xl p-6 shadow-cute">
              <Eye className="h-8 w-8 text-primary mb-2" />
              <p className="text-2xl font-bold text-foreground">125,430</p>
              <p className="text-sm text-muted-foreground">Tổng lượt xem</p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-cute">
              <Users className="h-8 w-8 text-accent mb-2" />
              <p className="text-2xl font-bold text-foreground">1,234</p>
              <p className="text-sm text-muted-foreground">Người dùng</p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-cute">
              <FileText className="h-8 w-8 text-highlight mb-2" />
              <p className="text-2xl font-bold text-foreground">{forms.filter(f => f.status === "pending").length}</p>
              <p className="text-sm text-muted-foreground">Forms chờ duyệt</p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-cute">
              <MessageSquare className="h-8 w-8 text-primary mb-2" />
              <p className="text-2xl font-bold text-foreground">{comments.length}</p>
              <p className="text-sm text-muted-foreground">Bình luận</p>
            </div>
          </div>
        )}

        {activeTab === "forms" && (
          <div className="bg-card rounded-xl shadow-cute overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Loại</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Tên</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground hidden sm:table-cell">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Trạng thái</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {forms.map((form) => (
                    <tr key={form.id} className="border-t border-border">
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          form.type === "comic" ? "bg-primary/20 text-primary" :
                          form.type === "ads" ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"
                        }`}>
                          {form.type === "comic" ? "Đăng truyện" : form.type === "ads" ? "Quảng cáo" : "Hỗ trợ"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground">{form.name}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">{form.email}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          form.status === "pending" ? "bg-highlight/20 text-highlight" :
                          form.status === "approved" ? "bg-green-500/20 text-green-600" : "bg-muted text-muted-foreground"
                        }`}>
                          {form.status === "pending" ? "Chờ duyệt" : form.status === "approved" ? "Đã duyệt" : "Đã phản hồi"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {form.status === "pending" && (
                          <div className="flex gap-2">
                            {form.type === "comic" ? (
                              <button 
                                onClick={() => handleApproveForm(form.id)} 
                                className="p-1.5 rounded-lg bg-green-500/20 text-green-600 hover:bg-green-500/30"
                                title="Duyệt"
                              >
                                <Check className="h-4 w-4" />
                              </button>
                            ) : form.type === "ads" ? (
                              <button 
                                onClick={() => handleOpenAdsForm(form)} 
                                className="p-1.5 rounded-lg bg-accent/20 text-accent hover:bg-accent/30"
                                title="Liên hệ"
                              >
                                <Send className="h-4 w-4" />
                              </button>
                            ) : (
                              <button 
                                onClick={() => handleOpenHelpForm(form)} 
                                className="p-1.5 rounded-lg bg-primary/20 text-primary hover:bg-primary/30"
                                title="Xem & Trả lời"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "comments" && (
          <div className="space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-card rounded-xl p-4 shadow-cute flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-medium text-foreground">{comment.username}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <Link to={`/comic/${comment.comicId}`} className="text-xs text-primary hover:underline">
                      {comment.comicTitle}
                    </Link>
                  </div>
                  <p className="text-sm text-foreground/80">{comment.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">{comment.date}</p>
                </div>
                <button onClick={() => handleDeleteComment(comment.id)} className="p-2 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "usercomics" && (
          <div className="space-y-3">
            {userComics.length === 0 ? (
              <div className="bg-card rounded-xl p-8 text-center text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Chưa có truyện nào được user đăng</p>
              </div>
            ) : (
              userComics.map((comic) => (
                <div key={comic.id} className="bg-card rounded-xl p-4 shadow-cute">
                  <div className="flex items-start gap-4">
                    <img src={comic.cover} alt={comic.title} className="w-20 h-28 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground text-lg mb-1">{comic.title}</h3>
                      <p className="text-sm text-muted-foreground mb-1">Tác giả: <span className="text-foreground">{comic.author}</span></p>
                      <p className="text-sm text-muted-foreground mb-2">{comic.chapters} chương • Đăng: {comic.createdAt}</p>
                      
                      {/* View Comic Link - Admin can preview before deleting */}
                      <div className="flex gap-2 flex-wrap">
                        <Link 
                          to={`/comic/${comic.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                          Xem truyện
                        </Link>
                        <button 
                          onClick={() => {
                            if (confirm("Bạn có chắc muốn xóa truyện này? User sẽ nhận được thông báo.")) {
                              // Send notification to user
                              const userNotifications = JSON.parse(localStorage.getItem(`notifications_${comic.author}`) || "[]");
                              userNotifications.push({
                                id: Date.now(),
                                title: "Truyện bị xóa",
                                message: `Truyện "${comic.title}" đã bị xóa do vi phạm tiêu chuẩn cộng đồng.`,
                                date: new Date().toLocaleDateString("vi-VN"),
                                read: false,
                              });
                              localStorage.setItem(`notifications_${comic.author}`, JSON.stringify(userNotifications));
                              
                              handleDeleteUserComicChapter(comic.id);
                            }
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive text-sm font-medium hover:bg-destructive/20 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                          Xóa truyện
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* Modal for viewing/replying to forms */}
      {selectedForm && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedForm(null)}>
          <div className="bg-card rounded-2xl shadow-cute-lg max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-display font-bold text-foreground">
                {selectedForm.type === "ads" ? "Liên hệ quảng cáo" : "Chi tiết yêu cầu hỗ trợ"}
              </h3>
              <button onClick={() => setSelectedForm(null)} className="p-1.5 rounded-lg hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-3 mb-6">
              <div>
                <span className="text-sm text-muted-foreground">Người gửi:</span>
                <p className="font-medium text-foreground">{selectedForm.name}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Email:</span>
                <p className="font-medium text-foreground">{selectedForm.email}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Nội dung:</span>
                <p className="text-foreground bg-muted/50 p-3 rounded-lg mt-1">{selectedForm.message}</p>
              </div>
            </div>

            {selectedForm.type === "ads" ? (
              <>
                <label className="text-sm font-medium text-foreground">Tin nhắn liên hệ:</label>
                <textarea
                  value={contactMessage}
                  onChange={e => setContactMessage(e.target.value)}
                  placeholder="Nhập tin nhắn liên hệ với bên quảng cáo..."
                  className="w-full mt-2 p-3 rounded-lg border border-border bg-background text-foreground resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  onClick={handleSendContactMessage}
                  disabled={!contactMessage.trim()}
                  className="w-full mt-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  Gửi tin nhắn liên hệ
                </button>
              </>
            ) : (
              <>
                <label className="text-sm font-medium text-foreground">Phản hồi:</label>
                <textarea
                  value={replyMessage}
                  onChange={e => setReplyMessage(e.target.value)}
                  placeholder="Nhập nội dung phản hồi..."
                  className="w-full mt-2 p-3 rounded-lg border border-border bg-background text-foreground resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  onClick={handleSendReply}
                  disabled={!replyMessage.trim()}
                  className="w-full mt-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  Gửi phản hồi
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
