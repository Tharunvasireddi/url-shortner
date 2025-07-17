import dotenv from "dotenv";
dotenv.config();

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  maxAge: 1000 * 60 * 10,
};

export { cookieOptions };
