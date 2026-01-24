import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Home, Eye, EyeOff } from "lucide-react";
import booksBackground from "@/assets/books-background.jpg";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

const Login = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for admin login
    if (formData.username === "admin" && formData.password === "admin123") {
      localStorage.setItem("currentUser", JSON.stringify({ 
        username: "admin", 
        isAdmin: true,
        fullName: "Administrator" 
      }));
      navigate("/admin");
      return;
    }
    
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: { username: string; password: string }) =>
        u.username === formData.username && u.password === formData.password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/");
    } else {
      setError("Tên tài khoản hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${booksBackground})` }}
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-background/70 backdrop-blur-sm" />
      
      {/* Header */}
      <div className="relative z-10">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center p-4">
        <div className="bg-card/95 backdrop-blur-md rounded-2xl shadow-cute-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-display font-bold text-foreground text-center mb-6">
            Đăng Nhập
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
                {error}
              </div>
            )}

            <div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Tài Khoản"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-center focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Mật Khẩu"
                className="w-full px-4 py-3 pr-12 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-center focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <label
                htmlFor="rememberMe"
                className="text-sm text-muted-foreground"
              >
                Nhớ mật khẩu
              </label>
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Home className="h-4 w-4" />
                Trang chủ
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all"
              >
                Đăng nhập
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
