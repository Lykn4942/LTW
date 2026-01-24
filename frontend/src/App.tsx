import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ComicDetail from "./pages/ComicDetail";
import ChapterReader from "./pages/ChapterReader";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import UserProfile from "./pages/UserProfile";
import Category from "./pages/Category";
import Admin from "./pages/Admin";
import UploadComic from "./pages/UploadComic";
import ManageComic from "./pages/ManageComic";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/comic/:id" element={<ComicDetail />} />
          <Route path="/comic/:comicId/chapter/:chapterId" element={<ChapterReader />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/upload-comic" element={<UploadComic />} />
          <Route path="/manage-comic/:id" element={<ManageComic />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
