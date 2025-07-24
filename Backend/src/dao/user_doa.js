import { shortUrl } from "../models/shorturlmodel.js";
import { User } from "../models/usermodel.js";
import { hassPassword } from "../utils/hashpassword.js";

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const findUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

const findUserByName = async (name) => {
  const user = await User.findOne({ name });
  return user;
};

const createUser = async (email, name, password) => {
  const hashedPassword = await hassPassword(password);
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();
  return newUser;
};

const getAllUrls = async (id) => {
  return await shortUrl.find({ user: id });
};
const deleteUrl = async (id) => {
  return await shortUrl.findByIdAndDelete({ _id: id });
};

export {
  findUserByEmail,
  findUserById,
  createUser,
  findUserByName,
  getAllUrls,
  deleteUrl,
};
