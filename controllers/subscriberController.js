const Subscriber = require('../models/subscriber')

const register = async (req, res) => {
  try {
    const newSubscriber = await Subscriber.create(req.body)
    // create a new course automatically since new student have been created
    res.status(200).send(newSubscriber)
  } catch (err) {
    console.error(err)
  }
}

const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find({})
    res.status(200).json(subscribers)
  } catch (err) {
    console.error(err)
  }
}

// get a specific subscriber by its id
const getSubscriber = async (req, res) => {
  const { id } = req.params
  try {
    const subscriber = await Subscriber.findById(id)
    res.status(200).json(subscriber)
  } catch (err) {
    console.error(err)
  }
}

const updateSubscriber = async (req, res) => {
  const { name, email } = req.body // parameters sent up from client (postman) as part of a POST request
  const { _id } = req.params // object containing properties mapped to the name route 'paramaters", here it will be _id to specify which one to edit to
  try {
    const updatedSubscriber = await Subscriber.findByIdAndUpdate(
      { _id: _id }, // id necessary in order to specify which subscriber have to be updated
      { $set: { name, email } }, // update data's subscriber
      // { '$set': { ...req.body } }, 2nd option
      { new: true } // save update
    )
    res.status(200).json(updatedSubscriber)
  } catch (err) {
    console.error(err)
  }
}

const deleteSubscriber = async (req, res) => {
  const { id } = req.params
  try {
    const removedSubscriber = await Subscriber.deleteOne({ _id: id })
    res.status(200).json({ success: 'User deleted successfully'})
  } catch (err) {
    console.err(err)
  }
}

module.exports = {
  register,
  getSubscribers,
  getSubscriber,
  updateSubscriber,
  deleteSubscriber,
}
