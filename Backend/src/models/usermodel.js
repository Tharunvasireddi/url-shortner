import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
//   avatar: {
//     type: String,
//     required: true,
//     default: function () {
//       return get;
//     },
//   },
});
// function getGravatarUrl(email) {
//   import hash from
// }

const User = mongoose.model("User", userSchema);

export { User };
