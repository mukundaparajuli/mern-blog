import React, { Suspense } from "react";
import Register from "./Components/Register";
import Login from "./Components/Login";
import BlogList from "./Components/BlogList";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./Components/Admin Dashboard/Dashboard";
import TextEditor from "./Components/Admin Dashboard/TextEditor";
import Users from "./Components/Admin Dashboard/Users";
import PostAnalysis from "./Components/Admin Dashboard/PostAnalysis";
import ViewPosts from "./Components/Admin Dashboard/ViewPosts";
import AdminProtectedRoute from "./utils/AdminProtectedRoute";
import UserProtectedRoutes from "./utils/UserProtectedRoutes";
const LazyBlogPage = React.lazy(() => import("./Components/BlogPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProtectedRoutes>
        <BlogList />
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
        element: <ViewPosts />,
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
