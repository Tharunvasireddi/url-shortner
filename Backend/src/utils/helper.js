import { nanoid } from "nanoid";

const generateNanoId =async (length) => {
  return nanoid(length);
};

export default generateNanoId;
