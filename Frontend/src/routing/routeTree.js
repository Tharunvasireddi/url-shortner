import RootLayout from "../App";
import { createRootRoute } from "@tanstack/react-router";
import { authRoute } from "./auth-route";
import { dashBoardRoute } from "./dashboard-route";
import { homeRoute } from "./home-route";
export const rootRoute = createRootRoute({
  component: RootLayout,
});

export const routeTree = rootRoute.addChildren([
  authRoute,
  dashBoardRoute,
  homeRoute,
]);
