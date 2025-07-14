import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import AuthPage from "../pages/AuthPage";
import RegisterForm from "../components/RegisterForm";
const regiserRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/Register",
  component: RegisterForm,
});

export { regiserRoute };
