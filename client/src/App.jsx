import React, { Suspense } from "react";
import Register from "./Components/Register";
import Login from "./Components/Login";
import BlogList from "./Components/BlogList";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./Components/Admin Dashboard/Dashboard";
import TextEditor from "./Components/Admin Dashboard/TextEditor";
import Users from "./Components/Admin Dashboard/Users";
import PostAnalysis from "./Components/Admin Dashboard/PostAnalysis";
// import ViewPosts from "./Components/Admin Dashboard/ViewPosts";
import AdminProtectedRoute from "./utils/AdminProtectedRoute";
import UserProtectedRoutes from "./utils/UserProtectedRoutes";
import BlogPage from "./Components/BlogPage";
import GetAllBlogs from "./Components/Admin Dashboard/GetAllBlogs";
import BlogsListDashboard from "./Components/BlogsListDashboard";
import BlogListByCategory from "./Components/BlogListByCategory";
import SearchBar from "./Components/SearchBar";
import BlogListBySearchTerm from "./Components/BlogListBySearchTerm";
import ProfileCard from "./Components/ProfileCard";
const LazyBlogPage = React.lazy(() => import("./Components/BlogPage"));

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
        <ProfileCard />
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
