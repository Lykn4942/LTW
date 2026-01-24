import { useState, useEffect } from "react";
import { ChevronLeft, User, BookMarked, History, Calendar, Bell, X, Plus, BookOpen, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";

interface FollowedComic {
  id: number;
  title: string;
  cover: string;
}

interface ReadHistory {
  comicId: number;
  comicTitle: string;
  cover: string;
  chapterId: number;
  chapterTitle: string;
  readAt: string;
}

interface Notification {
  id: number;
  type: "system" | "update";
  title: string;
  message: string;
  comicId?: number;
  date: string;
  read: boolean;
}

interface UserComic {
  id: number;
  title: string;
  cover: string;
  chapters: number;
  createdAt: string;
}

const sampleNotifications: Notification[] = [
  {
    id: 1,
    type: "update",
    title: "Chương mới",
    message: "Võ Đạo Độc Tôn vừa cập nhật Chương 4!",
    comicId: 1,
    date: new Date().toLocaleDateString("vi-VN"),
    read: false,
  },
  {
    id: 2,
    type: "system",
    title: "Thông báo hệ thống",
    message: "Chào mừng bạn đến với BookieCute! Chúc bạn có những giây phút đọc truyện vui vẻ.",
    date: new Date().toLocaleDateString("vi-VN"),
    read: false,
  },
];

const UserProfile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"followed" | "history" | "notifications" | "mycomics">("followed");
  const [currentUser, setCurrentUser] = useState<{ username: string; email?: string; fullName?: string; createdAt?: string; isAdmin?: boolean; canUploadComics?: boolean } | null>(null);
  const [followedComics, setFollowedComics] = useState<FollowedComic[]>([]);
  const [readHistory, setReadHistory] = useState<ReadHistory[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const [userComics, setUserComics] = useState<UserComic[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      navigate("/login");
      return;
    }
    const userData = JSON.parse(user);
    setCurrentUser({
      ...userData,
      createdAt: userData.createdAt || new Date().toLocaleDateString("vi-VN"),
    });

    // Load followed comics
    const comics = JSON.parse(localStorage.getItem("followedComics") || "[]");
    setFollowedComics(comics);

    // Load reading history
    const history = JSON.parse(localStorage.getItem("readingHistory") || "[]");
    setReadHistory(history);

    // Load notifications
    const savedNotifications = localStorage.getItem("notifications");
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }

    // Load user's uploaded comics
    const savedUserComics = localStorage.getItem(`userComics_${userData.username}`);
    if (savedUserComics) {
      setUserComics(JSON.parse(savedUserComics));
    }
  }, [navigate]);

  useEffect(() => {
    // Poll for changes
    const interval = setInterval(() => {
      const comics = JSON.parse(localStorage.getItem("followedComics") || "[]");
      setFollowedComics(comics);
      const history = JSON.parse(localStorage.getItem("readingHistory") || "[]");
      setReadHistory(history);
      
      if (currentUser) {
        const savedUserComics = localStorage.getItem(`userComics_${currentUser.username}`);
        if (savedUserComics) {
          setUserComics(JSON.parse(savedUserComics));
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentUser]);

  const markNotificationAsRead = (id: number) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Check if user can upload comics (admin or approved user)
  const canUploadComics = currentUser?.isAdmin || currentUser?.canUploadComics;

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="container py-6">
        {/* Back Button - Top Left */}
        <div className="mb-4 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card hover:bg-muted transition-colors text-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Quay lại trang chủ</span>
          </Link>

          {/* Admin Dashboard Button */}
          {currentUser.isAdmin && (
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span>Trang Quản Trị</span>
            </Link>
          )}
        </div>

        {/* User Info Card */}
        <div className="bg-card rounded-2xl shadow-cute-lg p-6 mb-6">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <User className="h-10 w-10 text-primary" />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-display font-bold text-foreground">
                  {currentUser.fullName || currentUser.username}
                </h1>
                {currentUser.isAdmin && (
                  <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">Admin</span>
                )}
                {canUploadComics && !currentUser.isAdmin && (
                  <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs font-medium">Tác giả</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">@{currentUser.username}</p>
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Ngày đăng ký: {currentUser.createdAt}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-card rounded-2xl shadow-cute-lg overflow-hidden">
          {/* Tab Buttons */}
          <div className="flex border-b border-border overflow-x-auto">
            <button
              onClick={() => setActiveTab("followed")}
              className={`flex-1 flex items-center justify-center gap-2 py-4 font-medium transition-colors min-w-[120px] ${
                activeTab === "followed"
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <BookMarked className="h-5 w-5" />
              <span className="hidden sm:inline">Đang theo dõi</span> ({followedComics.length})
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 flex items-center justify-center gap-2 py-4 font-medium transition-colors min-w-[120px] ${
                activeTab === "history"
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <History className="h-5 w-5" />
              <span className="hidden sm:inline">Lịch sử đọc</span> ({readHistory.length})
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`flex-1 flex items-center justify-center gap-2 py-4 font-medium transition-colors relative min-w-[120px] ${
                activeTab === "notifications"
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Bell className="h-5 w-5" />
              <span className="hidden sm:inline">Thông báo</span>
              {unreadCount > 0 && (
                <span className="absolute top-3 right-1/4 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            {canUploadComics && (
              <button
                onClick={() => setActiveTab("mycomics")}
                className={`flex-1 flex items-center justify-center gap-2 py-4 font-medium transition-colors min-w-[120px] ${
                  activeTab === "mycomics"
                    ? "text-primary border-b-2 border-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <BookOpen className="h-5 w-5" />
                <span className="hidden sm:inline">Truyện của tôi</span> ({userComics.length})
              </button>
            )}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "followed" ? (
              followedComics.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <BookMarked className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Bạn chưa theo dõi truyện nào</p>
                  <Link
                    to="/"
                    className="inline-block mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all"
                  >
                    Khám phá truyện
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {followedComics.map((comic) => (
                    <Link
                      key={comic.id}
                      to={`/comic/${comic.id}`}
                      className="group"
                    >
                      <div className="relative overflow-hidden rounded-xl">
                        <img
                          src={comic.cover}
                          alt={comic.title}
                          className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <p className="mt-2 text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {comic.title}
                      </p>
                    </Link>
                  ))}
                </div>
              )
            ) : activeTab === "history" ? (
              readHistory.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Bạn chưa đọc truyện nào</p>
                  <Link
                    to="/"
                    className="inline-block mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all"
                  >
                    Bắt đầu đọc ngay
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {readHistory.map((item, index) => (
                    <Link
                      key={index}
                      to={`/comic/${item.comicId}/chapter/${item.chapterId}`}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                    >
                      <img
                        src={item.cover}
                        alt={item.comicTitle}
                        className="w-12 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {item.comicTitle}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {item.chapterTitle}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {item.readAt}
                      </span>
                    </Link>
                  ))}
                </div>
              )
            ) : activeTab === "notifications" ? (
              /* Notifications Tab */
              notifications.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Không có thông báo mới</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-xl border transition-colors ${
                        notification.read
                          ? "bg-muted/30 border-border/50"
                          : "bg-primary/5 border-primary/20"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                              notification.type === "update"
                                ? "bg-accent/20 text-accent"
                                : "bg-primary/20 text-primary"
                            }`}
                          >
                            <Bell className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-foreground">{notification.title}</h4>
                              {!notification.read && (
                                <span className="w-2 h-2 bg-destructive rounded-full" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {notification.date}
                            </p>
                          </div>
                        </div>
                        {!notification.read && (
                          <button
                            onClick={() => markNotificationAsRead(notification.id)}
                            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                          >
                            <X className="h-4 w-4 text-muted-foreground" />
                          </button>
                        )}
                      </div>
                      {notification.comicId && (
                        <Link
                          to={`/comic/${notification.comicId}`}
                          className="inline-block mt-3 text-sm text-primary hover:underline"
                        >
                          Xem truyện →
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )
            ) : (
              /* My Comics Tab */
              <div>
                {/* Add New Comic Button */}
                <Link
                  to="/upload-comic"
                  className="flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all mb-6 group"
                >
                  <Plus className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-primary">Đăng truyện mới</span>
                </Link>

                {userComics.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Bạn chưa đăng truyện nào</p>
                    <p className="text-sm mt-2">Bấm vào nút phía trên để bắt đầu!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {userComics.map((comic) => (
                      <Link
                        key={comic.id}
                        to={`/manage-comic/${comic.id}`}
                        className="group"
                      >
                        <div className="relative overflow-hidden rounded-xl">
                          <img
                            src={comic.cover}
                            alt={comic.title}
                            className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                            <span className="text-xs text-white">{comic.chapters} chương</span>
                          </div>
                        </div>
                        <p className="mt-2 text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {comic.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserProfile;
