import RootLayout from "../App";
import { createRootRoute } from "@tanstack/react-router";
import { regiserRoute } from "./register-route";
import { dashBoardRoute } from "./dashboard-route";
import { homeRoute } from "./home-route";
import loginRoute from "./login-route";
export const rootRoute = createRootRoute({
  component: RootLayout,
});

export const routeTree = rootRoute.addChildren([
  regiserRoute,
  dashBoardRoute,
  homeRoute,
  loginRoute,
]);
