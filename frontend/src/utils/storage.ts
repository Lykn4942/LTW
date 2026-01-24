import { User, UserComic, Notification } from "@/types";

// ==================== User Storage ====================
export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user: User): void => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const removeCurrentUser = (): void => {
  localStorage.removeItem("currentUser");
};

// ==================== Comics Storage ====================
export const getUserComics = (username: string): UserComic[] => {
  const comics = localStorage.getItem(`comics_${username}`);
  return comics ? JSON.parse(comics) : [];
};

export const setUserComics = (username: string, comics: UserComic[]): void => {
  localStorage.setItem(`comics_${username}`, JSON.stringify(comics));
};

export const getAllUserComics = (): UserComic[] => {
  const allComics: UserComic[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("comics_")) {
      const comics = JSON.parse(localStorage.getItem(key) || "[]");
      allComics.push(...comics);
    }
  }
  return allComics;
};

// ==================== Follow List Storage ====================
export const getFollowList = (username?: string): number[] => {
  if (username) {
    return JSON.parse(localStorage.getItem(`followList_${username}`) || "[]");
  }
  return JSON.parse(sessionStorage.getItem("guestFollowList") || "[]");
};

export const setFollowList = (list: number[], username?: string): void => {
  if (username) {
    localStorage.setItem(`followList_${username}`, JSON.stringify(list));
  } else {
    sessionStorage.setItem("guestFollowList", JSON.stringify(list));
  }
};

// ==================== Notifications Storage ====================
export const getUserNotifications = (username: string): Notification[] => {
  const notifications = localStorage.getItem(`notifications_${username}`);
  return notifications ? JSON.parse(notifications) : [];
};

export const setUserNotifications = (username: string, notifications: Notification[]): void => {
  localStorage.setItem(`notifications_${username}`, JSON.stringify(notifications));
};

export const addUserNotification = (username: string, notification: Notification): void => {
  const existing = getUserNotifications(username);
  existing.unshift(notification);
  setUserNotifications(username, existing);
};

// ==================== Comments Storage ====================
export const getGlobalComments = () => {
  return JSON.parse(localStorage.getItem("globalComments") || "[]");
};

export const setGlobalComments = (comments: unknown[]): void => {
  localStorage.setItem("globalComments", JSON.stringify(comments));
};

// ==================== Theme Storage ====================
export const getTheme = (): "light" | "dark" => {
  return (localStorage.getItem("theme") as "light" | "dark") || "light";
};

export const setTheme = (theme: "light" | "dark"): void => {
  localStorage.setItem("theme", theme);
};
