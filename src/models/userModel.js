import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    userName: { type: String, unique: true },
    avartaImage: String,
    email: { type: String, required: true, unique: true },
    phoneNumber: String,
    role: { type: String, default: "USER" },
    password: { type: String, required: true },
    address: String,
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    shipper: { type: mongoose.Schema.Types.ObjectId, ref: "shippers" }
  },
  { versionKey: false }
);

// hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
