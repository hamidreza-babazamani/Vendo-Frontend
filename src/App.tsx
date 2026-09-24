import { Routes, Route } from "react-router-dom";

// Layout
import Layout from "./components/layout/Layout";

// Pages
import HomePage from "./pages/Home/HomePage";
import AuthPage from "./pages/Auth/AuthPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import PostDetailPage from "./pages/Post/PostDetailPage";
import CreatePostPage from "./pages/Post/CreatePostPage";
import CategoryPage from "./pages/Category/CategoryPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/post/create" element={<CreatePostPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;