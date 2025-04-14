// Node module Imports
import { Routes, Route } from "react-router-dom";

import Layout from "./components/templates/Layout";
import Blog from "./components/pages/Blog";
import CreateBlog from "./components/pages/CreateBlog";
import EmailVerification from "./components/pages/EmailVerification";
import Login from "./components/pages/Login";
import GoogleOAuth20 from "./components/pages/GoogleOAuth20";
import Home from "./components/pages/Home";
import Landing from "./components/pages/Landing";
import PasswordResetRequest from "./components/pages/PasswordResetRequest";
import PasswordReset from "./components/pages/PasswordReset";
import Register from "./components/pages/Register";
import Search from "./components/pages/Search";
import Unauthorized from "./components/pages/Unauthorized";
import Unavailable from "./components/pages/Unavailable";
import User from "./components/pages/User";
import UpdateBlog from "./components/pages/UpdateBlog";
import UpdateUser from "./components/pages/UpdateUser";
import AppLifecycle from "./components/miscellaneous/AppLifecycle";
import ContextProviders from "./components/miscellaneous/ContextProviders";

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
            <Route
              key={`route_${index}`}
              path={path}
              element={element}
              index={index}
            />
          ))}
        </Route>
      </Routes>
    </ContextProviders>
  );
}

export default App;
