import { useState, useEffect } from "react";
import { X, ExternalLink, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AdPopup = () => {
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    const adDismissed = document.cookie.includes("ad_dismissed=true");
    
    if (adDismissed) return;

    const timer = setTimeout(() => {
      setShowAd(true);
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowAd(false);
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    document.cookie = `ad_dismissed=true; expires=${expires.toUTCString()}; path=/`;
  };

  return (
    <Dialog open={showAd} onOpenChange={handleClose}>
      <DialogContent className="max-w-md border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5 [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Sparkles className="h-5 w-5 text-primary" />
            Ưu đãi đặc biệt!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Ad Image */}
          <div className="relative overflow-hidden rounded-xl">
            <img
              src="https://picsum.photos/seed/promo/400/200"
              alt="Khuyến mãi"
              className="w-full h-40 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <span className="inline-block px-2 py-1 rounded-full bg-highlight text-white text-xs font-bold">
                Giảm 50%
              </span>
            </div>
          </div>

          {/* Ad Content */}
          <div className="text-center">
            <h3 className="text-lg font-display font-bold text-foreground mb-2">
              Gói VIP Truyện Premium
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Đọc truyện không giới hạn, không quảng cáo, truy cập sớm các chương mới nhất!
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/80 transition-all"
              >
                Để sau
              </button>
              <a
                href="#"
                onClick={handleClose}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all flex items-center gap-2"
              >
                Xem ngay
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default AdPopup;
