import { createRoute } from "@tanstack/react-router";
import RootLayout from "../App";
import LoginForm from "../components/LoginForm";

const loginRoute = createRoute({
  getParentRoute: () => RootLayout,
  path: "/Login",
  component: LoginForm,
});

export default loginRoute;
