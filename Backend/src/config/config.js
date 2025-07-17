import dotenv from "dotenv";
dotenv.config();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "None",
  maxAge: 1000 * 60 * 5,
};

export { cookieOptions };
