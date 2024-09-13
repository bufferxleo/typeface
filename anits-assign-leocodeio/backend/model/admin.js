import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  uname: {
    type: String,
    default: "admin",
    required: true,
  },
  password: {
    type: String,
    required: true,
    default: "admin123",
  },
  role: {
    type: String,
    default: "admin",
  },
});

const Admin = mongoose.model("admin_user", adminSchema);

export default Admin;
