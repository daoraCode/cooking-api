// modules
require('dotenv').config()

// const cookies = require('cookie-parser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// User model imported
const User = require('../models/user')

// enter credentials for sign up
const signup = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body
    // essentials data inputs to enter for user
    if (!(name && lastName && email && password)) {
      return res.status(400).send({
        success: false,
        message: 'Credential Fields Are Mandatory. All Inputs Are Required',
      })
    }
    // verify existing user already exists
    const duplicated = await User.findOne({ email })
    if (duplicated) {
      return res.status(409).send({
        success: false,
        message: 'Conflict. User Already Exists',
      })
    }
    // encrypt/hash user's password created beforehand
    const hashed = await bcrypt.hash(password, 10)
    // create and save new user
    const user = await User.create({
      name,
      lastName,
      email,
      password: hashed,
    })
    // generate a new token for signature's user authentication
    // jwt is alse related to authorizations sign_in
    const accessAuthToken = jwt.sign(
      { user_id: user.id, email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    )
    accessAuthToken.token = token

    // token lasts much longer than access token
    const refreshAuthToken = jwt.sign(
      { user_id: user.id, email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1h' }
    )
    refreshAuthToken.token = token

    // the cookie will be not availbale to javascript
    res.cookie('jwt', refreshAuthToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })

    return res.status(200).send({
      success: true,
      message: "New User Account've Been Created",
    })
  } catch (err) {
    res.status(500).send({
      sucess: false,
      message: err.message,
    })
  }
}

// handle log in for user
const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!(email && password)) {
      return res
        .status(400)
        .json({ message: 'Required Email And Password For Sign In' })
    }
    // authorized either to continue on if user does exist from database within email credential
    // ortherwise permission denied since there is no user using such email
    const foundUser = await User.findOne({ email })
    if (!foundUser) return res.sendStatus(401) // Unauthorized
    // comparison between user password write from req.body parameters and user's paassword saved from database
    if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
      )
      foudUser.token = token
      return res.status(200).json({
        success: true,
        message: 'User Account Have Been Found',
        foundUser,
        token,
      })
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    })
  }
}

const logout = () => {
  try {
    // cookies will be used to implement token killing session thanks for both acess and refresh token
    cookies = req.cookies
    if (!cookies.jwt) return res.sendStatus(204) // No Content
    const refreshToken = cookies.jwt
    
    // chexk if token actually exist from user
    // const foundUser = await User.find({ token })
    // if (!foundUser) {
    //   currentUser = { ...foundUser, refreshToken: '' }
    // }

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.sendStatus(204)
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    })
  }
}

module.exports = { signup, login, logout }
