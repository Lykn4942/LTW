import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
  icon?: ReactNode;
  showMore?: boolean;
}

const SectionTitle = ({ children, icon, showMore = true }: SectionTitleProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="flex items-center gap-2 text-lg md:text-xl font-display font-bold text-foreground">
        {icon}
        <span>{children}</span>
      </h2>
      {showMore && (
        <a
          href="#"
          className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium transition-colors group"
        >
          Xem thêm
          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </a>
      )}
    </div>
  );
};

export default SectionTitle;
