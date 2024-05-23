import React, { Suspense } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import BlogList from "./components/BlogList";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/Admin Dashboard/Dashboard";
import TextEditor from "./components/Admin Dashboard/TextEditor";
import Users from "./components/Admin Dashboard/Users";
import PostAnalysis from "./components/Admin Dashboard/PostAnalysis";
// import ViewPosts from "./components/Admin Dashboard/ViewPosts";
import AdminProtectedRoute from "./utils/AdminProtectedRoute";
import UserProtectedRoutes from "./utils/UserProtectedRoutes";
import BlogPage from "./components/BlogPage";
import GetAllBlogs from "./components/Admin Dashboard/GetAllBlogs";
import BlogsListDashboard from "./components/BlogsListDashboard";
import BlogListByCategory from "./components/BlogListByCategory";
import SearchBar from "./components/SearchBar";
import BlogListBySearchTerm from "./components/BlogListBySearchTerm";
import ProfileCard from "./components/ProfileCard";
import ProfilePage from "./components/ProfilePage";
const LazyBlogPage = React.lazy(() => import("./components/BlogPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProtectedRoutes>
        <BlogsListDashboard />
      </UserProtectedRoutes>
    ),
    children: [
      {
        path: "/",
        element: (
          <UserProtectedRoutes>
            <BlogList />
          </UserProtectedRoutes>
        ),
      },
      {
        path: "/category/:categories",
        element: (
          <UserProtectedRoutes>
            <BlogListByCategory />
          </UserProtectedRoutes>
        ),
      },
      {
        path: "/search/:searchTerm",
        element: (
          <UserProtectedRoutes>
            <BlogListBySearchTerm />
          </UserProtectedRoutes>
        ),
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
      <UserProtectedRoutes>
        <Suspense fallback="Loading...">
          <LazyBlogPage />
        </Suspense>
      </UserProtectedRoutes>
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
