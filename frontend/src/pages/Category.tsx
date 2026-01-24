import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Tag } from "lucide-react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import ComicCard from "@/components/common/ComicCard";
import Footer from "@/components/layout/Footer";

const categoryNames: Record<string, string> = {
  "van-hoc": "Văn học",
  "lich-su": "Lịch sử",
  "nghe-thuat-van-hoa": "Nghệ thuật & Văn hóa",
  "khoa-hoc-cong-nghe": "Khoa học & Công nghệ",
  "khoa-hoc-xa-hoi": "Khoa học xã hội & Xã hội",
  "ton-giao-triet-hoc": "Tôn giáo & Triết học",
  "loi-song-so-thich": "Lối sống & Sở thích",
  "suc-khoe-y-hoc": "Sức khỏe & Y học",
  "giao-duc-tham-khao": "Giáo dục & Tham khảo",
};

// Sample comics for each category
const sampleComics = [
  { id: 1, title: "Võ Đạo Độc Tôn", cover: "https://picsum.photos/seed/comic1/300/400", chapter: "Chương 245", views: 15000, isNew: true },
  { id: 2, title: "Ta Là Vua", cover: "https://picsum.photos/seed/comic2/300/400", chapter: "Chương 189", views: 12000 },
  { id: 3, title: "Trọng Sinh Đô Thị", cover: "https://picsum.photos/seed/comic3/300/400", chapter: "Chương 312", views: 9800 },
  { id: 4, title: "Tiên Nghịch", cover: "https://picsum.photos/seed/comic4/300/400", chapter: "Chương 567", views: 8700, isNew: true },
  { id: 5, title: "Đấu La Đại Lục", cover: "https://picsum.photos/seed/comic5/300/400", chapter: "Chương 890", views: 7600, isNew: true },
  { id: 6, title: "Thần Ấn Vương Tọa", cover: "https://picsum.photos/seed/comic6/300/400", chapter: "Chương 456", views: 6500 },
];

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const categoryName = categoryNames[slug || ""] || "Thể loại";

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Pink Header */}
      <div className="h-16 bg-primary/30" />

      <main className="container py-6 -mt-8">
        {/* Header with back button */}
        <div className="bg-card rounded-2xl shadow-cute-lg p-6 mb-6">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </Link>
            <Tag className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-display font-bold text-foreground">
              {categoryName}
            </h1>
          </div>
        </div>

        {/* Comics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {sampleComics.map((comic) => (
            <ComicCard
              key={comic.id}
              id={comic.id}
              title={comic.title}
              cover={comic.cover}
              chapter={comic.chapter}
              views={comic.views}
              isNew={comic.isNew}
            />
          ))}
        </div>

        {/* Empty state if no comics */}
        {sampleComics.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Tag className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Chưa có truyện nào trong thể loại này</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Category;
