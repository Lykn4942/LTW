import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-header mt-12">
      <div className="container py-8">
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <a
            href="#"
            className="text-header-foreground/80 hover:text-header-foreground text-sm transition-colors"
          >
            Quy định
          </a>
          <Link
            to="/about"
            className="text-header-foreground/80 hover:text-header-foreground text-sm transition-colors"
          >
            Về chúng tôi
          </Link>
          <Link
            to="/contact"
            className="text-header-foreground/80 hover:text-header-foreground text-sm transition-colors"
          >
            Liên hệ
          </Link>
          <Link
            to="/help"
            className="text-header-foreground/80 hover:text-header-foreground text-sm transition-colors"
          >
            Trợ giúp
          </Link>
        </div>

        <div className="text-center">
          <p className="text-header-foreground/60 text-sm">
            © 2024 BookieCute 📚 Đọc truyện online miễn phí
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
