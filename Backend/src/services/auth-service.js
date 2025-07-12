import { signToken } from "../utils/helper.js";
import { findUserByEmail, findUserByName } from "../dao/user_doa.js";
import { createUser } from "../dao/user_doa.js";
import { NotFoundError, ConflictError } from "../utils/errorhandler.js";
import { verifyPassword } from "../utils/hashpassword.js";

const registerUser = async (name, email, password) => {
  const isUserExisted = await findUserByEmail(email);
  if (isUserExisted) {
    throw new ConflictError("user already existed");
  }
  const newUser = await createUser(email, name, password);
  const token = await signToken({ id: newUser._id });
  return token;
};

const loginUser = async (name, password) => {
  const user = await findUserByName(name);
  if (!user) {
    throw new NotFoundError("user not found");
  }
  const isPassWordMatch = await verifyPassword(user.password, password);
  if (!isPassWordMatch) {
    throw new ConflictError("incorrect password ");
  }
  const token = await signToken({ id: user._id });
  return token;
};

export { registerUser, loginUser };
