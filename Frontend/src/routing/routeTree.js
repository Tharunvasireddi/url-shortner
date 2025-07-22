import RootLayout from "../App";
import { createRootRoute } from "@tanstack/react-router";
import { registerRoute } from "./register-route.js";
import { dashBoardRoute } from "./dashboard-route.js";
import { homeRoute } from "./home-route.js";
import loginRoute from "./login-route.js";
export const rootRoute = createRootRoute({
  component: RootLayout,
});

export const routeTree = rootRoute.addChildren([
  registerRoute,
  dashBoardRoute,
  homeRoute,
  loginRoute,
]);
