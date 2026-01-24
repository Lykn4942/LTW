import { useState } from "react";
import { ChevronLeft, Phone, Mail, Facebook, Send, Check, MessageCircle, Globe, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "comic",
    message: "",
    notifyMe: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    toast({
      title: "Gửi thành công! ✨",
      description: "Form của bạn đã được gửi thành công. Chúng tôi sẽ phản hồi sớm nhất!",
    });
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", reason: "comic", message: "", notifyMe: false });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Hero Banner */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary" />
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/contact-books/1920/400')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary-foreground/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-20 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
        
        <div className="container relative h-full flex flex-col items-center justify-center text-center">
          {/* Back button */}
          <Link
            to="/"
            className="absolute top-6 left-4 p-2 rounded-lg bg-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/20 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-primary-foreground" />
          </Link>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm mb-4">
            <MessageCircle className="h-4 w-4 text-primary-foreground" />
            <span className="text-sm text-primary-foreground font-medium">Liên hệ</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground drop-shadow-lg">
            💌 Contact Us
          </h1>
          <p className="mt-3 text-primary-foreground/80 max-w-md">
            Chúng tôi luôn sẵn sàng lắng nghe bạn ✨
          </p>
        </div>
      </div>

      <main className="container py-12 -mt-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Contact Info */}
          <div className="space-y-6">
            {/* Quick Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-card rounded-2xl shadow-cute p-5 border border-border/50 hover:shadow-cute-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-1">Điện thoại</h3>
                <p className="text-sm text-muted-foreground">0123-456-789</p>
              </div>
              <div className="bg-card rounded-2xl shadow-cute p-5 border border-border/50 hover:shadow-cute-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-bold text-foreground mb-1">Email</h3>
                <p className="text-sm text-muted-foreground">contact@bookiecute.com</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-card rounded-2xl shadow-cute-lg p-6 border border-border/50">
              <h2 className="text-xl font-display font-bold text-foreground mb-5 flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Kênh liên lạc
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Facebook className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Facebook Fanpage</p>
                    <p className="text-sm text-muted-foreground">fb.com/bookiecute</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Website</p>
                    <p className="text-sm text-muted-foreground">bookiecute.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Link */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 border border-border/50">
              <div className="flex items-center gap-3 mb-3">
                <Heart className="h-5 w-5 text-primary" />
                <p className="text-foreground font-medium">Cần được hỗ trợ?</p>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Nếu bạn gặp vấn đề khi sử dụng website, hãy truy cập trang trợ giúp.
              </p>
              <Link
                to="/help"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all"
              >
                Đi đến Trợ giúp
              </Link>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-card rounded-2xl shadow-cute-lg p-8 border border-border/50 h-fit">
            <h2 className="text-xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" />
              Gửi liên hệ
            </h2>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                  <Check className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-2">
                  Gửi thành công!
                </h3>
                <p className="text-muted-foreground">
                  Chúng tôi sẽ phản hồi trong thời gian sớm nhất
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tên tài khoản
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nhập tên của bạn"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Lí do liên hệ</label>
                  <div className="flex flex-wrap gap-3">
                    <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-xl border border-border bg-background hover:bg-muted transition-colors">
                      <input
                        type="radio"
                        name="reason"
                        value="comic"
                        checked={formData.reason === "comic"}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-sm text-foreground">Đăng truyện</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-xl border border-border bg-background hover:bg-muted transition-colors">
                      <input
                        type="radio"
                        name="reason"
                        value="ads"
                        checked={formData.reason === "ads"}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-sm text-foreground">Quảng cáo</span>
                    </label>
                  </div>
                </div>

                {/* Only show message field when reason is ads */}
                {formData.reason === "ads" && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nội dung tin nhắn
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Nhập nội dung bạn muốn gửi..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                      required
                    />
                  </div>
                )}

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.notifyMe}
                    onChange={(e) => setFormData({ ...formData, notifyMe: e.target.checked })}
                    className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">Gửi thông báo về phản hồi cho tôi</span>
                </label>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold transition-all hover:opacity-90 flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="h-5 w-5" />
                  Gửi liên hệ
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
