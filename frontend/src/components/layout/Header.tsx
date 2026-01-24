import { useState, useEffect, useRef } from "react";
import { Menu, Search, Tag, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/common/ThemeToggle";
import { categories } from "@/constants/categories";
import { searchableComics } from "@/constants/sampleData";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const filteredComics = searchableComics.filter((comic) =>
    comic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setShowCategories(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowResults(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-header shadow-cute">
      <div className="container flex h-14 items-center justify-between gap-2 sm:gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="text-lg sm:text-xl font-display font-bold text-header-foreground">
            📚 BookieCute
          </span>
        </Link>

        {/* Category Dropdown */}
        <div className="relative hidden sm:block" ref={categoryRef}>
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-header-foreground/10 hover:bg-header-foreground/20 text-header-foreground text-sm font-medium transition-all"
          >
            <Tag className="h-4 w-4" />
            <span className="hidden md:inline">Thể loại</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${showCategories ? "rotate-180" : ""}`} />
          </button>

          {showCategories && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-card rounded-xl shadow-cute-lg border border-border overflow-hidden animate-fade-in z-[60]">
              <div className="max-h-[60vh] overflow-y-auto">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/category/${cat.slug}`}
                    onClick={() => setShowCategories(false)}
                    className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-2" ref={searchRef}>
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(e.target.value.length > 0);
              }}
              onFocus={() => searchQuery.length > 0 && setShowResults(true)}
              placeholder="Tìm truyện..."
              className="w-full h-9 pl-10 pr-4 rounded-full bg-card/90 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />

            {/* Search Results Dropdown */}
            {showResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl shadow-cute-lg border border-border overflow-hidden animate-fade-in z-[60]">
                {filteredComics.length > 0 ? (
                  filteredComics.map((comic) => (
                    <Link
                      key={comic.id}
                      to={`/comic/${comic.id}`}
                      onClick={() => {
                        setShowResults(false);
                        setSearchQuery("");
                      }}
                      className="block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      {comic.title}
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-muted-foreground">
                    Không tìm thấy truyện
                  </div>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Theme Toggle & Hamburger Menu */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg bg-header-foreground/10 hover:bg-header-foreground/20 text-header-foreground transition-all hover:scale-105 active:scale-95"
            aria-label="Mở menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
