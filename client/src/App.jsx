import React, { Suspense } from "react";
import Register from "./Components/Register";
import Login from "./Components/Login";
import BlogList from "./Components/BlogList";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./Components/Admin Dashboard/Dashboard";
import TextEditor from "./Components/Admin Dashboard/TextEditor";
import Users from "./Components/Admin Dashboard/Users";
import PostAnalysis from "./Components/Admin Dashboard/PostAnalysis";
import AdminProtectedRoute from "./utils/AdminProtectedRoute";
import UserProtectedRoutes from "./utils/UserProtectedRoutes";
import BlogPage from "./Components/BlogPage";
import GetAllBlogs from "./Components/Admin Dashboard/GetAllBlogs";
import BlogsListDashboard from "./Components/BlogsListDashboard";
import BlogListByCategory from "./Components/BlogListByCategory";
import BlogListBySearchTerm from "./Components/BlogListBySearchTerm";
import ProfilePage from "./Components/ProfilePage";
import Footer from "./Components/Footer";
const LazyBlogPage = React.lazy(() => import("./Components/BlogPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <BlogsListDashboard />,
    children: [
      {
        path: "/",
        element: <BlogList />,
      },
      {
        path: "/category/:categories",
        element: <BlogListByCategory />,
      },
      {
        path: "/search/:searchTerm",
        element: <BlogListBySearchTerm />,
      },
    ],
  },
  {
    path: "/profile",
    element: (
      <UserProtectedRoutes>
        <ProfilePage />
      </UserProtectedRoutes>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <UserProtectedRoutes>
        <AdminProtectedRoute>
          <Dashboard />
        </AdminProtectedRoute>
      </UserProtectedRoutes>
    ),
    children: [
      {
        path: "text-editor",
        element: <TextEditor />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "post-analysis",
        element: <PostAnalysis />,
      },
      {
        path: "view-posts",
        element: <GetAllBlogs />,
      },
      {
        path: "blog/:_id",
        element: <BlogPage />,
      },
    ],
  },
  {
    path: "/blog/:_id",
    element: (
      <Suspense fallback="Loading...">
        <LazyBlogPage />
      </Suspense>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
