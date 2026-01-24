import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Check, ArrowLeft, ArrowRight, Home, Eye, EyeOff } from "lucide-react";
import booksBackground from "@/assets/books-background.jpg";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

interface FormData {
  fullName: string;
  phone: string;
  birthDate: string;
  region: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
}

const Register = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    birthDate: "",
    region: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({
      username: formData.username,
      password: formData.password,
      email: formData.email,
      fullName: formData.fullName,
      createdAt: new Date().toLocaleDateString("vi-VN"),
    });
    localStorage.setItem("users", JSON.stringify(users));
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${booksBackground})` }}
      >
        <div className="fixed inset-0 bg-background/70 backdrop-blur-sm" />
        <div className="relative z-10 bg-card/95 backdrop-blur-md rounded-2xl shadow-cute-lg p-8 max-w-sm w-full text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            Đăng Ký Thành Công
          </h2>
          <p className="text-muted-foreground mb-6">
            Tài khoản của bạn đã được tạo thành công
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
          >
            Đăng nhập ngay
          </button>
        </div>
      </div>
    );
  }

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
            Đăng Ký
          </h1>

          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className={`w-3 h-3 rounded-full ${step >= 1 ? "bg-primary" : "bg-muted"}`} />
            <div className={`w-8 h-0.5 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
            <div className={`w-3 h-3 rounded-full ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Khu vực
                  </label>
                  <input
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
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
                    type="button"
                    onClick={handleNextStep}
                    className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all"
                  >
                    Tiếp tục
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Tên tài khoản
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
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
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Nhập lại mật khẩu
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
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
                    onClick={handlePrevStep}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Quay lại
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all"
                  >
                    Hoàn thành
                  </button>
                </div>
              </div>
            )}
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
