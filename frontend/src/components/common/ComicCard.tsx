import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, Heart, HeartOff } from "lucide-react";
import { formatViews } from "@/utils/format";

interface ComicCardProps {
  id: number;
  title: string;
  cover: string;
  chapter?: string;
  views?: number;
  isNew?: boolean;
}

const ComicCard = ({ id, title, cover, chapter, views, isNew }: ComicCardProps) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      const followList = JSON.parse(localStorage.getItem(`followList_${user.username}`) || "[]");
      setIsFollowed(followList.includes(id));
    } else {
      const guestFollowList = JSON.parse(sessionStorage.getItem("guestFollowList") || "[]");
      setIsFollowed(guestFollowList.includes(id));
    }
  }, [id]);

  const handleFollow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const currentUser = localStorage.getItem("currentUser");
    
    if (currentUser) {
      const user = JSON.parse(currentUser);
      const storageKey = `followList_${user.username}`;
      const followList = JSON.parse(localStorage.getItem(storageKey) || "[]");
      
      if (isFollowed) {
        const newList = followList.filter((comicId: number) => comicId !== id);
        localStorage.setItem(storageKey, JSON.stringify(newList));
      } else {
        followList.push(id);
        localStorage.setItem(storageKey, JSON.stringify(followList));
      }
    } else {
      const followList = JSON.parse(sessionStorage.getItem("guestFollowList") || "[]");
      
      if (isFollowed) {
        const newList = followList.filter((comicId: number) => comicId !== id);
        sessionStorage.setItem("guestFollowList", JSON.stringify(newList));
      } else {
        followList.push(id);
        sessionStorage.setItem("guestFollowList", JSON.stringify(followList));
      }
    }
    
    setIsFollowed(!isFollowed);
  };

  return (
    <Link
      to={`/comic/${id}`}
      className="group block rounded-xl overflow-hidden bg-card shadow-cute hover:shadow-cute-lg transition-all duration-300 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cover Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-comic">
        <img
          src={cover}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* New Badge */}
        {isNew && (
          <span className="absolute top-2 left-2 px-2 py-0.5 bg-highlight text-primary-foreground text-xs font-bold rounded-full animate-pulse-soft">
            Mới
          </span>
        )}

        {/* Views Badge */}
        {views && (
          <span className="absolute top-2 right-2 px-2 py-0.5 bg-foreground/70 text-background text-xs font-medium rounded-full flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {formatViews(views)}
          </span>
        )}

        {/* Follow Button */}
        {isHovered && (
          <div className="absolute inset-x-0 bottom-0 animate-fade-in">
            <button
              onClick={handleFollow}
              className={`w-full py-3 flex items-center justify-center gap-2 font-medium transition-all ${
                isFollowed
                  ? "bg-primary/90 text-primary-foreground"
                  : "bg-primary/80 text-primary-foreground"
              }`}
            >
              {isFollowed ? (
                <>
                  <HeartOff className="h-4 w-4" />
                  Bỏ Theo Dõi
                </>
              ) : (
                <>
                  <Heart className="h-4 w-4" />
                  Theo Dõi
                </>
              )}
            </button>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-display font-semibold text-foreground line-clamp-2 text-sm group-hover:text-primary transition-colors">
          {title}
        </h3>
        {chapter && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {chapter}
          </p>
        )}
      </div>
    </Link>
  );
};

export default ComicCard;
