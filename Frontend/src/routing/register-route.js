import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree.js";
import RegisterForm from "../components/RegisterForm.jsx";
const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/Register",
  component: RegisterForm,
});

export { registerRoute };
