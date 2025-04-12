// Node module Imports
import { useEffect, useRef } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Configuration Imports
import config from "../../config/config";

import {
  // Hooks
  useLocalStorage,

  // Contexts
  useMessage,
  usePreLoader,

  // Redux - actions
  securityActions,

  // Utilities
  eventBus,
} from "../../config/exports";

function AppLifecycle() {
  const {
    PROTECTED_ROUTES: protectedRoutes,
    AUTH_REQ_EXCLUDED_PATHS: authReqExcludedPaths,
  } = config;

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showMessage = useMessage();
  const showPreLoader = usePreLoader();

  const prevPath = useRef(pathname);

  const [alreadyVisited, setFirstVisit] = useLocalStorage(
    "already-visited",
    false
  );

  const {
    loading: loading_currentUserRequest,
    currentUser,
    loading_currentUser,
  } = useSelector((state) => state.security);

  // Reset scroll position when navigating between pages.
  useEffect(() => window.scrollTo(0, 0), [pathname]);

  // Automatically send auth request when the page mounts.
  useEffect(() => {
    if (!authReqExcludedPaths.some((path) => matchPath(path, pathname)))
      dispatch(securityActions.getCurrentUser());
  }, []); // eslint-disable-line

  // Automatically send auth request when navigating from auth-req-excluded-paths.
  useEffect(() => {
    prevPath.current = pathname;

    return () => {
      if (
        authReqExcludedPaths.some((path) => matchPath(path, prevPath.current))
      ) {
        dispatch(securityActions.getCurrentUser());
      }
    };
  }, [pathname, authReqExcludedPaths, dispatch]);

  // Display pre-loader when sending auth request.
  useEffect(() => {
    showPreLoader(loading_currentUserRequest);
  }, [showPreLoader, loading_currentUserRequest]);

  // Show notification when a server error is detected
  useEffect(() => {
    const handleError = ({ type, message }) => showMessage(type, message);

    eventBus.on("serverError", handleError);

    return () => {
      eventBus.off("serverError", handleError);
    };
  }, [showMessage]);

  // Redirect to the unauthorized page for restricted routes.
  useEffect(() => {
    if (loading_currentUser === true) return;

    const protectedRoute = protectedRoutes.some((route) =>
      matchPath(route, pathname)
    );

    if (protectedRoute && !currentUser) {
      navigate("/unauthorized");
    }
  }, [navigate, pathname, protectedRoutes, currentUser, loading_currentUser]);

  // Redirect to the welcome page on the first visit.
  useEffect(() => {
    if (!alreadyVisited && pathname === "/" && !currentUser) {
      setFirstVisit(true);
      navigate("/welcome");
    }
  }, [navigate, pathname, alreadyVisited, setFirstVisit, currentUser]);

  // Set a random theme color from predefined options [OPTIONAL]
  // useEffect(() => {
  //   const root = document.body;
  //   const colorVarName = "--predefined-theme-color";
  //   const maxColors = 9;

  //   const randomVar = `${colorVarName}${Math.floor(
  //     Math.random() * maxColors + 1
  //   )}`;
  //   const currentColor = getComputedStyle(root)
  //     .getPropertyValue(randomVar)
  //     .trim();

  //   root.style.setProperty("--theme-color", currentColor);
  // }, []);

  return null;
}

export default AppLifecycle;
