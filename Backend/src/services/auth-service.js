import jwt from "jsonwebtoken";
import { signToken } from "../utils/helper.js";
import { findUserByEmail } from "../dao/user_doa.js";
import { createUser } from "../dao/user_doa.js";

const regiserUser = async (name, email, password) => {
  const isUserExisted = await findUserByEmail(email);
  if (isUserExisted) {
    throw new ConflictError("user already existed");
  }
  const newUser = await createUser(email, name, password);
  if (!newUser) {
    return res.status.json({
      success: false,
      message: "failed to register user ",
    });
  }
  const token = await signToken({ id: newUser._id });
  return { token, newUser };
};

export { regiserUser };
