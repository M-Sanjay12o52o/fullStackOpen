const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (req, res, next) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
  } catch (err) {
    next(err);
  }

  res.status(201).json(savedUser);
});

usersRouter.get("/", async (req, res) => {
  try {
    const users = await User.find({}).populate("blogs");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = usersRouter;
