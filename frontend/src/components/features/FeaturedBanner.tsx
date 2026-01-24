import { useState, useEffect } from "react";
import { Star, Eye, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { featuredComics } from "@/constants/sampleData";
import { formatNumber } from "@/utils/format";

const FeaturedBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleSlideChange((currentIndex + 1) % featuredComics.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleSlideChange = (newIndex: number) => {
    if (isTransitioning || newIndex === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  const goToPrev = () => {
    handleSlideChange((currentIndex - 1 + featuredComics.length) % featuredComics.length);
  };

  const goToNext = () => {
    handleSlideChange((currentIndex + 1) % featuredComics.length);
  };

  const goToSlide = (index: number) => {
    handleSlideChange(index);
  };

  const currentComic = featuredComics[currentIndex];

  return (
    <section className="mb-10">
      <div className="relative rounded-2xl overflow-hidden bg-card shadow-cute-lg">
        {/* Background Image with Overlay */}
        <div className="relative h-[280px] sm:h-[320px] md:h-[380px]">
          {featuredComics.map((comic, index) => (
            <div
              key={comic.id}
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                index === currentIndex
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            >
              <img
                src={comic.cover}
                alt={comic.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            </div>
          ))}
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container">
              <div 
                className={`max-w-lg text-white transition-all duration-500 ${
                  isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                }`}
              >
                {/* Genre Badge */}
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold mb-3 ml-10">
                  <Star className="h-3 w-3" />
                  {currentComic.genre}
                </span>
                
                {/* Title */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 drop-shadow-lg pl-10">
                  {currentComic.title}
                </h2>
                
                {/* Description */}
                <p className="text-sm sm:text-base opacity-90 mb-4 line-clamp-2 pl-10">
                  {currentComic.description}
                </p>
                
                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 ml-10">
                  <span className="flex items-center gap-1.5 text-sm">
                    <Eye className="h-4 w-4 text-accent" />
                    {formatNumber(currentComic.views)} lượt xem
                  </span>
                  <span className="flex items-center gap-1.5 text-sm">
                    <Heart className="h-4 w-4 text-highlight" />
                    {formatNumber(currentComic.followers)} theo dõi
                  </span>
                </div>
                
                {/* CTA Button */}
                <Link
                  to={`/comic/${currentComic.id}`}
                  className="inline-block px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-glow ml-10"
                >
                  Đọc ngay
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all"
            aria-label="Truyện trước"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all"
            aria-label="Truyện tiếp theo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {featuredComics.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-6 bg-primary"
                  : "w-2 bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Đi đến slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBanner;
