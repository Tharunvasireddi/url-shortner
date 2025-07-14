import { createRoute } from "@tanstack/react-router";
import LoginForm from "../components/LoginForm";
import { rootRoute } from "./routeTree";

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/Login",
  component: LoginForm,
});

export default loginRoute;
