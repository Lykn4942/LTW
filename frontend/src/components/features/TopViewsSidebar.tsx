import { useState } from "react";
import { TrendingUp, Heart } from "lucide-react";
import { topViewsComics, topFollowersComics } from "@/constants/sampleData";
import { formatNumber } from "@/utils/format";

type TabType = "views" | "followers";

const TopViewsSidebar = () => {
  const [activeTab, setActiveTab] = useState<TabType>("views");

  const comics = activeTab === "views" ? topViewsComics : topFollowersComics;

  return (
    <div className="bg-card rounded-2xl p-4 shadow-cute">
      {/* Tab Buttons */}
      <div className="flex items-center gap-1 mb-4 bg-muted rounded-lg p-1">
        <button
          onClick={() => setActiveTab("views")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-sm font-medium transition-all ${
            activeTab === "views"
              ? "bg-card text-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <TrendingUp className="h-4 w-4" />
          <span className="hidden sm:inline">Lượt xem</span>
        </button>
        <button
          onClick={() => setActiveTab("followers")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-sm font-medium transition-all ${
            activeTab === "followers"
              ? "bg-card text-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Heart className="h-4 w-4" />
          <span className="hidden sm:inline">Theo dõi</span>
        </button>
      </div>

      <div className="space-y-3">
        {comics.map((comic) => (
          <a
            key={comic.rank}
            href="#"
            className="flex items-start gap-3 group"
          >
            {/* Rank Badge */}
            <span
              className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                comic.rank === 1
                  ? "bg-highlight text-primary-foreground"
                  : comic.rank === 2
                  ? "bg-accent text-accent-foreground"
                  : comic.rank === 3
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {comic.rank}
            </span>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm line-clamp-1 group-hover:text-primary transition-colors">
                {comic.title}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{comic.chapter}</span>
                <span>•</span>
                <span className="flex items-center gap-0.5">
                  {activeTab === "views" ? "🔥" : "❤️"} {formatNumber(activeTab === "views" ? comic.views! : comic.followers!)}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TopViewsSidebar;
