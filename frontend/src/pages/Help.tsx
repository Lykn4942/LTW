import { useState } from "react";
import { Send, Check, HelpCircle, MessageCircle, Lightbulb, BookOpen, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import { toast } from "@/hooks/use-toast";

const faqs = [
  {
    question: "Làm thế nào để đăng ký tài khoản?",
    answer: "Bạn có thể đăng ký bằng cách nhấn vào nút Đăng ký ở menu và điền thông tin cần thiết.",
  },
  {
    question: "Làm sao để theo dõi truyện yêu thích?",
    answer: "Nhấn vào nút Theo Dõi ở trang thông tin truyện hoặc hover vào bìa truyện.",
  },
  {
    question: "Tôi muốn đăng truyện lên BookieCute?",
    answer: "Vui lòng liên hệ với chúng tôi qua trang Contact để gửi form đăng truyện.",
  },
];

const Help = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
    notifyMe: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: "Gửi thành công! ✨",
      description: "Form của bạn đã được gửi thành công. Chúng tôi sẽ hỗ trợ bạn sớm nhất!",
    });
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", issue: "", notifyMe: false });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Hero Banner */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent via-primary to-accent" />
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/help-desk/1920/400')] bg-cover bg-center opacity-20 mix-blend-overlay" />
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
          
          <div className="w-16 h-16 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center mb-4">
            <HelpCircle className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground drop-shadow-lg">
            Trung tâm hỗ trợ
          </h1>
          <p className="mt-2 text-primary-foreground/80">
            Chúng tôi luôn sẵn sàng giúp đỡ bạn 💝
          </p>
        </div>
      </div>

      <main className="container py-10 -mt-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - FAQs & Info */}
          <div className="space-y-6">
            {/* Quick Help Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-card rounded-2xl shadow-cute p-5 border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-1">Chat hỗ trợ</h3>
                <p className="text-sm text-muted-foreground">Phản hồi trong 24h</p>
              </div>
              <div className="bg-card rounded-2xl shadow-cute p-5 border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                  <BookOpen className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-bold text-foreground mb-1">Hướng dẫn</h3>
                <p className="text-sm text-muted-foreground">Xem các FAQ phổ biến</p>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-card rounded-2xl shadow-cute-lg p-6 border border-border/50">
              <div className="flex items-center gap-3 mb-5">
                <Lightbulb className="h-6 w-6 text-highlight" />
                <h2 className="text-xl font-display font-bold text-foreground">Câu hỏi thường gặp</h2>
              </div>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Link */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 border border-border/50">
              <p className="text-foreground mb-3">
                Nếu bạn muốn liên hệ để đăng truyện hoặc hợp tác quảng cáo:
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                Liên hệ ngay
              </Link>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-card rounded-2xl shadow-cute-lg p-8 border border-border/50 h-fit">
            <h2 className="text-xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" />
              Gửi yêu cầu hỗ trợ
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
                  Chúng tôi sẽ hỗ trợ bạn trong thời gian sớm nhất
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
                    placeholder="Nhập tên tài khoản của bạn"
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

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Vấn đề cần được hỗ trợ
                  </label>
                  <textarea
                    value={formData.issue}
                    onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                    placeholder="Mô tả chi tiết vấn đề bạn gặp phải..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    required
                  />
                </div>

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
                  Gửi yêu cầu
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

export default Help;
