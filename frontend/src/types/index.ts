// ==================== Comic Types ====================
export interface Comic {
  id: number;
  title: string;
  cover: string;
  chapter?: string;
  views?: number;
  isNew?: boolean;
}

export interface FeaturedComic {
  id: number;
  title: string;
  cover: string;
  description: string;
  views: number;
  followers: number;
  genre: string;
}

export interface UserComic {
  id: string;
  title: string;
  description: string;
  category: string;
  cover: string;
  chapters: Chapter[];
  createdAt: string;
  author: string;
  status?: string;
  otherName?: string;
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

// ==================== User Types ====================
export interface User {
  username: string;
  isAdmin?: boolean;
  canUploadComics?: boolean;
  email?: string;
  password?: string;
}

export interface FollowedComic {
  id: number;
  title: string;
  cover: string;
  chapter?: string;
  updatedAt?: string;
}

export interface ReadHistory {
  comicId: number;
  comicTitle: string;
  chapterTitle: string;
  readAt: string;
  cover: string;
}

// ==================== Comment Types ====================
export interface Comment {
  id: number;
  username: string;
  content: string;
  time: string;
  avatar: string;
  comicId?: number;
  comicTitle?: string;
}

// ==================== Notification Types ====================
export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type?: "info" | "warning" | "success" | "error";
}

export interface AdminNotification {
  id: number;
  type: "form" | "comment" | "user";
  message: string;
  time: string;
  read: boolean;
}

// ==================== Form Types ====================
export interface ContactForm {
  id: number;
  name: string;
  email: string;
  reason: string;
  message?: string;
  time: string;
  status: "pending" | "approved" | "contacted";
}

// ==================== Category Types ====================
export interface Category {
  name: string;
  slug: string;
}

// ==================== Rating Types ====================
export interface RatingEmoji {
  emoji: string;
  label: string;
  value: number;
}
