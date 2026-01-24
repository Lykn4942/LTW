import { useState } from "react";
import { Heart, BookOpen, Users, Sparkles, Star, Award, Coffee, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";

const teamMembers = [
  {
    name: "Nguyễn Văn A",
    role: "Founder & CEO",
    avatar: "🐱",
    description: "Yêu truyện từ nhỏ, muốn chia sẻ niềm đam mê với mọi người",
  },
  {
    name: "Trần Thị B",
    role: "Content Manager",
    avatar: "🐰",
    description: "Chuyên gia sàng lọc và quản lý nội dung chất lượng",
  },
  {
    name: "Lê Văn C",
    role: "Developer",
    avatar: "🦊",
    description: "Xây dựng trải nghiệm đọc truyện mượt mà nhất",
  },
];

const values = [
  {
    icon: Heart,
    title: "Đam mê",
    description: "Chúng tôi yêu thích việc mang đến những câu chuyện hay nhất",
  },
  {
    icon: Star,
    title: "Chất lượng",
    description: "Cam kết cung cấp nội dung được chọn lọc kỹ càng",
  },
  {
    icon: Coffee,
    title: "Thân thiện",
    description: "Giao diện dễ sử dụng, trải nghiệm thoải mái",
  },
];

const AboutUs = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Hero Banner */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary" />
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/library-books/1920/400')] bg-cover bg-center opacity-20 mix-blend-overlay" />
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
            <Sparkles className="h-4 w-4 text-primary-foreground" />
            <span className="text-sm text-primary-foreground font-medium">Về chúng tôi</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground drop-shadow-lg">
            BookieCute
          </h1>
          <p className="mt-3 text-primary-foreground/80 max-w-md">
            Nơi những câu chuyện bắt đầu ✨
          </p>
        </div>
      </div>

      <main className="container py-12 -mt-8">
        {/* Story Section */}
        <div className="bg-card rounded-3xl shadow-cute-lg p-8 md:p-12 mb-10 border border-border/50">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Heart className="h-10 w-10 text-primary-foreground" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                Câu chuyện của chúng tôi
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                BookieCute được thành lập vào năm 2024 với mong muốn mang đến cho độc giả
                Việt Nam một nền tảng đọc truyện trực tuyến chất lượng cao, miễn phí và
                thân thiện với người dùng.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Chúng tôi tin rằng mỗi cuốn sách đều có sức mạnh thay đổi cuộc sống, và 
                sứ mệnh của chúng tôi là kết nối những câu chuyện tuyệt vời với những 
                người yêu thích đọc sách.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { value: "10K+", label: "Truyện", icon: BookOpen },
            { value: "50K+", label: "Độc giả", icon: Users },
            { value: "100K+", label: "Lượt đọc", icon: Award },
            { value: "24/7", label: "Cập nhật", icon: Sparkles },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl shadow-cute p-6 text-center border border-border/50 hover:shadow-cute-lg transition-shadow"
            >
              <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-display font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-3xl p-8 md:p-12 mb-10 border border-border/50">
          <h2 className="text-2xl font-display font-bold text-foreground text-center mb-8">
            Giá trị cốt lõi
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 text-center shadow-cute hover:scale-105 transition-transform"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-card rounded-3xl shadow-cute-lg p-8 md:p-12 border border-border/50">
          <h2 className="text-2xl font-display font-bold text-foreground text-center mb-8">
            Đội ngũ của chúng tôi
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-muted/50 to-muted hover:from-primary/5 hover:to-accent/5 transition-colors"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4 text-5xl shadow-inner">
                  {member.avatar}
                </div>
                <h3 className="font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
