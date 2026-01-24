import { Category } from "@/types";

export const categories: Category[] = [
  { name: "Văn học", slug: "van-hoc" },
  { name: "Lịch sử", slug: "lich-su" },
  { name: "Nghệ thuật & Văn hóa", slug: "nghe-thuat-van-hoa" },
  { name: "Khoa học & Công nghệ", slug: "khoa-hoc-cong-nghe" },
  { name: "Khoa học xã hội", slug: "khoa-hoc-xa-hoi" },
  { name: "Tôn giáo & Triết học", slug: "ton-giao-triet-hoc" },
  { name: "Lối sống & Sở thích", slug: "loi-song-so-thich" },
  { name: "Sức khỏe & Y học", slug: "suc-khoe-y-hoc" },
  { name: "Giáo dục & Tham khảo", slug: "giao-duc-tham-khao" },
];

export const categoryNames: Record<string, string> = {
  "van-hoc": "Văn học",
  "lich-su": "Lịch sử",
  "nghe-thuat-van-hoa": "Nghệ thuật & Văn hóa",
  "khoa-hoc-cong-nghe": "Khoa học & Công nghệ",
  "khoa-hoc-xa-hoi": "Khoa học xã hội",
  "ton-giao-triet-hoc": "Tôn giáo & Triết học",
  "loi-song-so-thich": "Lối sống & Sở thích",
  "suc-khoe-y-hoc": "Sức khỏe & Y học",
  "giao-duc-tham-khao": "Giáo dục & Tham khảo",
};

export const getCategoryName = (slug: string): string => {
  return categoryNames[slug] || "Thể loại";
};

export const getCategorySlug = (name: string): string => {
  const category = categories.find((c) => c.name === name);
  return category?.slug || "";
};
