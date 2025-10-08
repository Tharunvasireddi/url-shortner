import { shortUrl } from "../models/shorturlmodel.js";
import { User } from "../models/usermodel.js";
import { hashPassword } from "../utils/hashpassword.js";

const findUserByEmail = async (email) => {
  console.log("🔍 DAO: findUserByEmail called with:", email);
  try {
    const isUserExisted = await User.findOne({ email: email });
    console.log("🔍 DAO: User exists:", !!isUserExisted);
    return isUserExisted;
  } catch (error) {
    console.error("❌ DAO: Error in findUserByEmail:", error.message);
    throw error;
  }
};

const findUserById = async (id) => {
  console.log("🔍 DAO: findUserById called with ID:", id);
  console.log("🔍 DAO: ID type:", typeof id);

  try {
    console.log("🔍 DAO: Executing User.findById...");
    const user = await User.findById(id);
    console.log("🔍 DAO: Query result:", !!user);
    console.log(
      "🔍 DAO: User data:",
      user ? { id: user._id, name: user.name } : "null"
    );
    return user;
  } catch (error) {
    console.error("❌ DAO: Database error in findUserById:");
    console.error("   - Error:", error.message);
    throw error;
  }
};

const findUserByName = async (name) => {
  const user = await User.findOne({ name });
  return user;
};

const createUser = async (email, name, password) => {
  console.log("🔍 DAO: createUser called");
  console.log("   - Name:", name);
  console.log("   - Email:", email);
  console.log("   - Password provided:", !!password);

  try {
    console.log("🔍 DAO: Hashing password...");
    const hashedPassword = await hashPassword(password);
    console.log("🔍 DAO: Password hashed successfully");

    console.log("🔍 DAO: Creating new user object...");
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    console.log("🔍 DAO: Saving user to database...");
    await newUser.save();
    console.log("✅ DAO: User saved successfully");
    console.log("🔍 DAO: New user ID:", newUser._id);

    return newUser;
  } catch (error) {
    console.error("❌ DAO: Error in createUser:");
    console.error("   - Error name:", error.name);
    console.error("   - Error message:", error.message);
    console.error("   - Error code:", error.code);

    // Check for specific MongoDB errors
    if (error.code === 11000) {
      console.error("   - Duplicate key error - user already exists");
      throw new Error("User with this email or name already exists");
    }

    if (error.name === "ValidationError") {
      console.error("   - Validation error:", error.message);
      throw new Error("User validation failed: " + error.message);
    }

    throw error;
  }
};

const getAllUrls = async (id) => {
  return await shortUrl.find({ user: id });
};
const deleteUrl = async (id) => {
  return await shortUrl.findByIdAndDelete({ _id: id });
};

const registerUser = async (name, email, password) => {
  console.log("🔐 AUTH SERVICE: registerUser called");
  console.log("   - Name:", name);
  console.log("   - Email:", email);

  try {
    console.log("🔐 AUTH SERVICE: Checking if user exists...");
    const existingUser = await findUserByEmail(email);
    console.log("🔐 AUTH SERVICE: Existing user check result:", !!existingUser);

    if (existingUser) {
      console.log("❌ AUTH SERVICE: User already exists");
      throw new Error("User already exists with this email");
    }

    console.log("🔐 AUTH SERVICE: Creating new user...");
    const newUser = await createUser(email, name, password);
    console.log("✅ AUTH SERVICE: User created successfully");

    return newUser;
  } catch (error) {
    console.error("❌ AUTH SERVICE: Error in registerUser:");
    console.error("   - Error:", error.message);
    throw error;
  }
};

export {
  findUserByEmail,
  findUserById,
  createUser,
  findUserByName,
  getAllUrls,
  deleteUrl,
  registerUser,
};
