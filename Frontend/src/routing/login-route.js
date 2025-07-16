import { createRoute } from "@tanstack/react-router";
import LoginForm from "../components/LoginForm.jsx";
import { rootRoute } from "./routeTree.js";

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/Login",
  component: LoginForm,
});

export default loginRoute;
