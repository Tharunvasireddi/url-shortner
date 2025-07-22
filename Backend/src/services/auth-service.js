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
  // Use consistent token payload structure with both id and name
  const token = await signToken({ id: newUser._id, name: newUser.name });
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
  // Use consistent token payload structure with both id and name
  const token = await signToken({ id: user._id, name: user.name });
  return { token, user };
};

export { registerUser, loginUser };
