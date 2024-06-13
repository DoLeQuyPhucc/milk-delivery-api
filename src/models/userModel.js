import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    avartaImage: String,
    email: String,
    phoneNumber: String,
    role: String,
    password: String,
    address: String,
  },
  { versionKey: false }
);

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
