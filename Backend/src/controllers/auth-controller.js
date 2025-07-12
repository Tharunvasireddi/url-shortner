import { createUser, findUserByEmail } from "../dao/user_doa.js";
import { ConflictError } from "../utils/errorhandler.js";
import wrapAsync from "../utils/tryCatchWrafer.js";
import jwt from "jsonwebtoken";

const registerConroller = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;
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
  const token = jwt.sign({ id: newUser._id });
});
const loginController = wrapAsync(async (req, res) => {});
export { registerConroller, loginController };
