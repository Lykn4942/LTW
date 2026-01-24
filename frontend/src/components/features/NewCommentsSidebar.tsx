import { useState, useEffect } from "react";
import { MessageCircle, BookMarked } from "lucide-react";
import { Link } from "react-router-dom";
import { Comment, FollowedComic } from "@/types";
import { sampleComments } from "@/constants/sampleData";

type TabType = "comments" | "followed";

const NewCommentsSidebar = () => {
  const [activeTab, setActiveTab] = useState<TabType>("comments");
  const [followedComics, setFollowedComics] = useState<FollowedComic[]>([]);
  const [comments, setComments] = useState<Comment[]>(sampleComments);

  useEffect(() => {
    const loadData = () => {
      const currentUser = localStorage.getItem("currentUser");
      const storage = currentUser ? localStorage : sessionStorage;
      const comics = JSON.parse(storage.getItem("followedComics") || "[]");
      setFollowedComics(comics);

      const storedComments = JSON.parse(localStorage.getItem("globalComments") || "[]");
      if (storedComments.length > 0) {
        setComments((prev) => {
          const newComments = storedComments.filter(
            (sc: Comment) => !prev.some((pc) => pc.id === sc.id)
          );
          return [...newComments, ...prev].slice(0, 10);
        });
      }
    };

    loadData();
    const interval = setInterval(loadData, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card rounded-2xl p-4 shadow-cute">
      {/* Tab Buttons */}
      <div className="flex items-center gap-1 mb-4 bg-muted rounded-lg p-1">
        <button
          onClick={() => setActiveTab("comments")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-sm font-medium transition-all ${
            activeTab === "comments"
              ? "bg-card text-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Bình luận</span>
        </button>
        <button
          onClick={() => setActiveTab("followed")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-sm font-medium transition-all ${
            activeTab === "followed"
              ? "bg-card text-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <BookMarked className="h-4 w-4" />
          <span className="hidden sm:inline">Theo dõi</span>
        </button>
      </div>

      {activeTab === "comments" ? (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="group p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{comment.avatar}</span>
                <span className="font-medium text-sm text-foreground">
                  {comment.username}
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 pl-7">
                {comment.content}
              </p>
              <div className="flex items-center gap-2 mt-1 pl-7">
                <span className="text-xs text-muted-foreground/70">
                  {comment.time}
                </span>
                <span className="text-xs text-muted-foreground/50">•</span>
                <Link
                  to={`/comic/${comment.comicId}`}
                  className="text-xs text-primary hover:underline"
                >
                  {comment.comicTitle}
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {followedComics.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              Bạn chưa theo dõi truyện nào
            </div>
          ) : (
            followedComics.map((comic) => (
              <Link
                key={comic.id}
                to={`/comic/${comic.id}`}
                className="flex items-start gap-3 group p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <img
                  src={comic.cover}
                  alt={comic.title}
                  className="w-12 h-16 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {comic.title}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NewCommentsSidebar;
