import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import { HomePage } from "../pages/Homepage";

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component:HomePage,
});

export { homeRoute };
