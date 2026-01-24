import { useState } from "react";
import { Flame, Sparkles, CheckCircle2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import ComicCard from "@/components/common/ComicCard";
import SectionTitle from "@/components/common/SectionTitle";
import TopViewsSidebar from "@/components/features/TopViewsSidebar";
import NewCommentsSidebar from "@/components/features/NewCommentsSidebar";
import FeaturedBanner from "@/components/features/FeaturedBanner";
import AdPopup from "@/components/features/AdPopup";
import { hotComics, newUpdatedComics, completedComics } from "@/constants/sampleData";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="container py-6">
        <FeaturedBanner />

        <section className="mb-10">
          <SectionTitle icon={<Flame className="h-5 w-5 text-highlight" />}>
            Truyện Hot
          </SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {hotComics.slice(0, 4).map((comic) => (
              <ComicCard key={comic.id} {...comic} />
            ))}
          </div>
        </section>

        <section className="mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SectionTitle icon={<Sparkles className="h-5 w-5 text-accent" />}>
                Truyện Mới Cập Nhật
              </SectionTitle>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {newUpdatedComics.slice(0, 6).map((comic) => (
                  <ComicCard key={comic.id} {...comic} />
                ))}
              </div>
            </div>
            <div className="lg:col-span-1">
              <TopViewsSidebar />
            </div>
          </div>
        </section>

        <section className="mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SectionTitle icon={<CheckCircle2 className="h-5 w-5 text-primary" />}>
                Truyện Đã Hoàn Thành
              </SectionTitle>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {completedComics.slice(0, 4).map((comic) => (
                  <ComicCard key={comic.id} {...comic} />
                ))}
              </div>
            </div>
            <div className="lg:col-span-1">
              <NewCommentsSidebar />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AdPopup />
    </div>
  );
};

export default Index;
