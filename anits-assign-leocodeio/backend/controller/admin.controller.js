import Admin from "../model/admin.js";

const createAdmin = async (req, res) => {
  try {
    const admin = await Admin.create({
      uname: "admin",
      password: "admin123",
      role: "admin",
    });
    if (admin) {
      console.log("admin created");
    }
  } catch (error) {
    console.log(error);
  }
};

const adminLogin = async (req, res) => {
  try {
    const { uname, password } = req.body;
    // console.log(req.body);
    // console.log(uname, password);
    const admin = await Admin.findOne({ uname, password });
    if (admin) {
      res.status(200).json({ message: "Admin logged in successfully" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging in" });
  }
};

export { adminLogin, createAdmin };
