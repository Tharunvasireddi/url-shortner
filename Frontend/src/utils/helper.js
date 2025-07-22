import { redirect } from "@tanstack/react-router";
import { getCurrentUser } from "../api/userapi.js";
import { login } from "../store/slices/authSlice.js";
export const checkAuth = async ({ context }) => {
  try {
    const { queryClient, store } = context;
    const user = await queryClient.ensureQueryData({
      queryKey: ["currentUser"],
      queryFn: getCurrentUser,
    });
    console.log("this is user ", user.user);
    if (!user) throw redirect({ to: "/Login" });
    store.dispatch(login(user));
    const { isAuthenticated } = store.getState().auth;
    if (!isAuthenticated) throw redirect({ to: "/Login" });
    return true;
  } catch (error) {
    throw redirect({ to: "/Login" });
  }
};
