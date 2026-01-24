import { X, ChevronRight, Tag, Heart, Clock, Star, BookOpen, LogOut, User, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { categories } from "@/constants/categories";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ username: string; isAdmin?: boolean } | null>(null);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    
    const notifications = localStorage.getItem("notifications");
    if (notifications) {
      const parsed = JSON.parse(notifications);
      setHasUnreadNotifications(parsed.some((n: { read: boolean }) => !n.read));
    } else {
      setHasUnreadNotifications(true);
    }
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    onClose();
    navigate("/");
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const menuItems = [
    { icon: Heart, label: "Yêu thích", href: "#" },
    { icon: Clock, label: "Lịch sử đọc", href: "#" },
    { icon: Star, label: "Xếp hạng", href: "#" },
    { icon: BookOpen, label: "Truyện đã hoàn thành", href: "#" },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-50 shadow-cute-lg transform transition-all duration-300 ease-out bg-sidebar overflow-hidden
          sm:top-0 sm:right-0 sm:h-full sm:w-72
          max-sm:left-0 max-sm:right-0 max-sm:top-16 max-sm:h-auto max-sm:max-h-[70vh] max-sm:w-full
          ${isOpen 
            ? "sm:translate-x-0 max-sm:opacity-100 max-sm:visible max-sm:pointer-events-auto" 
            : "sm:translate-x-full max-sm:opacity-0 max-sm:invisible max-sm:pointer-events-none"
          }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-foreground transition-colors z-10"
          aria-label="Đóng menu"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Sidebar Content */}
        <div className="pt-16 max-sm:pt-4 px-4 space-y-2 overflow-y-auto max-h-[calc(100vh-4rem)] max-sm:max-h-[calc(100vh-8rem)] pb-20 max-sm:pb-8">
          {currentUser ? (
            <>
              {/* User Info */}
              <Link
                to="/profile"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-foreground transition-colors relative"
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-sidebar-foreground/20 flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                  {hasUnreadNotifications && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full border-2 border-sidebar animate-pulse-soft" />
                  )}
                </div>
                <span className="font-medium">{currentUser.username}</span>
              </Link>

              {/* Admin Dashboard */}
              {currentUser.isAdmin && (
                <Link
                  to="/admin"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/20 hover:bg-primary/30 text-sidebar-foreground font-medium transition-all hover:translate-x-1"
                >
                  <Settings className="h-5 w-5" />
                  <span>Trang Quản Trị</span>
                </Link>
              )}

              <div className="h-px bg-sidebar-border my-4" />

              {/* Categories */}
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-foreground font-medium transition-all"
              >
                <div className="flex items-center gap-3">
                  <Tag className="h-5 w-5" />
                  <span>Thể loại</span>
                </div>
                <ChevronRight className={`h-5 w-5 transition-transform ${isCategoriesOpen ? "rotate-90" : ""}`} />
              </button>

              {isCategoriesOpen && (
                <div className="ml-4 pl-4 border-l-2 border-sidebar-border space-y-1 animate-fade-in">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      to={`/category/${category.slug}`}
                      onClick={onClose}
                      className="block px-3 py-2 text-sidebar-foreground/90 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-md transition-colors text-sm"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Menu Items */}
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sidebar-accent/50 text-sidebar-foreground font-medium transition-all hover:translate-x-1"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              ))}

              <div className="h-px bg-sidebar-border my-4" />

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-destructive text-destructive-foreground font-medium transition-all hover:bg-destructive/90"
              >
                <LogOut className="h-5 w-5" />
                <span>Đăng xuất</span>
              </button>
            </>
          ) : (
            <>
              {/* Auth Buttons */}
              <Link
                to="/login"
                onClick={onClose}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-foreground font-medium transition-all hover:translate-x-1"
              >
                <User className="h-5 w-5" />
                <span>Đăng nhập</span>
              </Link>

              <Link
                to="/register"
                onClick={onClose}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-foreground font-medium transition-all hover:translate-x-1"
              >
                <User className="h-5 w-5" />
                <span>Đăng ký</span>
              </Link>

              <div className="h-px bg-sidebar-border my-4" />

              {/* Categories for guests */}
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-foreground font-medium transition-all"
              >
                <div className="flex items-center gap-3">
                  <Tag className="h-5 w-5" />
                  <span>Thể loại</span>
                </div>
                <ChevronRight className={`h-5 w-5 transition-transform ${isCategoriesOpen ? "rotate-90" : ""}`} />
              </button>

              {isCategoriesOpen && (
                <div className="ml-4 pl-4 border-l-2 border-sidebar-border space-y-1 animate-fade-in">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      to={`/category/${category.slug}`}
                      onClick={onClose}
                      className="block px-3 py-2 text-sidebar-foreground/90 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-md transition-colors text-sm"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Menu Items for guests */}
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sidebar-accent/50 text-sidebar-foreground font-medium transition-all hover:translate-x-1"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              ))}
            </>
          )}
        </div>

        {/* Bottom decoration */}
        <div className="absolute bottom-8 left-0 right-0 text-center hidden sm:block">
          <span className="text-sidebar-foreground/60 text-sm">
            ✨ Đọc truyện vui vẻ ✨
          </span>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
