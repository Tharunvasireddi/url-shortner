import { shortUrl } from "../models/shorturlmodel.js";
import { User } from "../models/usermodel.js";
import { hassPassword } from "../utils/hashpassword.js";

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const findUserById = async (id) => {
  return await User.findById(id);
};

const findUserByName = async (name) => {
  return await User.findOne({ name });
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
