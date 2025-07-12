import dotenv from "dotenv";
dotenv.config();

const cookieOptions = {
  httpOnly: true,
  securre: process.env.NODE_ENV === "production",
  sameSite: "Lax",
  maxAge: 1000 * 60 * 5,
};

export { cookieOptions };
