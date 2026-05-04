const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"));

(async () => {
  const hashed = await bcrypt.hash("123456", 10);

  await User.create({
    name: "Admin",
    email: "admin@gmail.com",
    password: hashed
  });

  console.log("✅ User Created");
  process.exit();
})();