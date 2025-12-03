const jwt = require("jsonwebtoken");
const User = require("../schemas/userSchema");

const JWT_SECRET = "tnjdcJNsdjn"; // keep same for now

// signup
const signup = async (req, res) => {
  try {
    const insert = new User(req.body);
    const savedData = await insert.save();

    return res.status(200).json({
      message: "data recieved",
      data: savedData,
    });
  } catch (err) {
    console.error("Error inserting data:", err);
    return res
      .status(500)
      .json({ message: "Error inserting data", error: err });
  }
};

// signin
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.password === password) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET);
      return res
        .status(200)
        .json({ status: "ok", data: token, isAdmin: user.isAdmin });
    }

    return res.status(401).json({ message: "Invalid password" });
  } catch (error) {
    console.error("Error during sign in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// validate login
const userEmail = async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const user_email = user.email;

    const userData = await User.findOne({ email: user_email });

    if (!userData) {
      return res
        .status(404)
        .send({ status: "error", message: "User not found" });
    }

    return res
      .status(200)
      .send({ status: "ok", user: userData, isAdmin: userData.isAdmin });
  } catch (err) {
    console.error("Error fetching user email:", err);
    return res
      .status(500)
      .send({ status: "error", message: "Internal server error" });
  }
};

module.exports = {
  signup,
  signin,
  userEmail,
};
