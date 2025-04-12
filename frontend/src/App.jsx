// Node module Imports
import { Routes, Route } from "react-router-dom";

import {
  // Templates
  Layout,

  // Pages
  Blog,
  CreateBlog,
  EmailVerification,
  Login,
  GoogleOAuth20,
  Home,
  Landing,
  PasswordResetRequest,
  PasswordReset,
  Register,
  Search,
  Unauthorized,
  Unavailable,
  User,
  UpdateBlog,
  UpdateUser,

  // Miscellaneous
  AppLifecycle,
  ContextProviders,
} from "./config/exports";

function App() {
  const routes = [
    // Basic routes
    { path: "welcome", element: <Landing /> },
    { index: true, element: <Home /> },

    // Auth routes
    { path: "register", element: <Register /> },
    { path: "login", element: <Login /> },
    { path: "email-verification/:userId/:token", element: <EmailVerification /> }, // prettier-ignore
    { path: "password-reset/request", element: <PasswordResetRequest /> },
    { path: "password-reset/:userId/:token", element: <PasswordReset /> },
    { path: "google", element: <GoogleOAuth20 /> },

    // Blog routes
    { path: "write", element: <CreateBlog /> },
    { path: "blog/:blogId", element: <Blog /> },
    { path: "blog/update/:blogId", element: <UpdateBlog /> },

    // User routes
    { path: "user/:userId", element: <User /> },
    { path: "user/update/:userId", element: <UpdateUser /> },

    // Error/utility routes
    { path: "search/:searchQuery?", element: <Search /> },
    { path: "unauthorized", element: <Unauthorized /> },
    { path: "*", element: <Unavailable /> },
  ];

  return (
    <ContextProviders>
      <AppLifecycle />
      <Routes>
        <Route path="/" element={<Layout />}>
          {routes.map(({ path, element, index }) => (
            <Route key={`route_${index}`} path={path} element={element} index={index} />
          ))}
        </Route>
      </Routes>
    </ContextProviders>
  );
}

export default App;
