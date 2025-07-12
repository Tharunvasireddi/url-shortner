import { User } from "../models/usermodel.js";
import { hassPassword } from "../utils/hashpassword.js";

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const findUserById = async (id) => {
  return await User.findById(id);
};

const createUser = async (email, name, password) => {
  const hashedPassword = await hassPassword(password);
  const newUser = new User({ name, email, password :hashedPassword });
  await newUser.save();
  return newUser;
};

export { findUserByEmail, findUserById, createUser };
