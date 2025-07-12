import argon2 from "argon2";

const hassPassword = async (password) => {
  try {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  } catch (error) {
    console.log("error at password hashing ", error);
  }
};

const verifyPassword = async (storedPassword, enteredPassword) => {
  try {
    const isPasswordMatch = await argon2.verify(
      storedPassword,
      enteredPassword
    );
    return isPasswordMatch;
  } catch (error) {
    console.log("error at verify password ", error);
  }
};
export { hassPassword, verifyPassword };
