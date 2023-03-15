const express = require("express");
const Subscriber = require('../models/subscriber');
const userRouter = express.Router();

const User = require('../models/user')

const { login, logout } = require('../controllers/authController')

// auth
userRouter.post("/login", login)
userRouter.post("/logout", logout)

// creates a new user
userRouter.post("/create", async (req, res) => {
  try {
    const beSubscribed = await Subscriber.find()// find by email
    if (!beSubscribed) res.sendStatus(401) // Unauthorized
    // a revoir
    populate('subscribedAccount') // key to populate
  } catch (err) {
    console.error(err)
  }
})

// routes for rendering every users created since beginning
userRouter.get("/all", async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    console.error(err)
  }
})

// get a user by its id
userRouter.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  } catch (err) {
    console.error(err)
  }
})

// update a user by its id
userRouter.put("/:id/update", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(req.params.id)
    res.status(200).json(updatedUser)
  } catch (err) {
    console.error(err)
  }
})

// delete a user by its id
userRouter.delete("/:id/delete", async (req, res) => {
  try {
    const deletedUser = await User.deleteOne(req.params.id)
    res.status(200).json(deletedUser)
  } catch (err) {
    console.error(err)
  }
})

module.exports = userRouter;
