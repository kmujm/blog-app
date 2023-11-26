import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/home";
import LoginPage from "../pages/login";
import PostsPage from "../pages/posts";
import PostsDetail from "../pages/posts/detail";
import PostsEdit from "../pages/posts/edit";
import PostsNew from "../pages/posts/new";
import ProfilePage from "../pages/profile";
import SignupPage from "../pages/signup";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/:id" element={<PostsDetail />} />
        <Route path="/posts/new" element={<PostsNew />} />
        <Route path="/posts/edit/:id" element={<PostsEdit />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* 정의되지 않은 path가 입력되었을 때 replace */}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}
