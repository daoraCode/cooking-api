const express = require('express')
const verifyJWT = require('../middlewares/verifyJWT')
const Course = require('../models/course')
const courseRouter = express.Router()

// creates a new course but must be authentied

//

courseRouter.post('/create', verifyJWT, async (req, res) => {
  const { title, description } = req.body
  try {
    const newCourse = await Course.create(title, description)
    res.status(200).json(newCourse)
  } catch (err) {
    console.error(err)
  }
})

// routes for rendering every courses created from the start
courseRouter.get('/all', async (req, res) => {
  try {
    const courses = await Course.find()
    res.status(200).json(courses)
  } catch (err) {
    console.error(err)
  }
})

// get a course by its id
courseRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const course = await Course.findById(id).populate('subscriber')
    res.status(200).json(course)
  } catch (err) {
    console.error(err)
  }
})

// update a course by its id
courseRouter.put('/:id/update', async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
  } catch (err) {
    console.error(err)
  }
})

// delete a course by its id
courseRouter.delete('/:id/delete', async (req, res) => {
  const { id } = req.params
  try {
    const deletedCourse = await Course.deleteOne(id)
    res.status(200).json({ success: 'Course deleted sucessfully' })
  } catch (err) {
    console.error(err)
  }
})

module.exports = courseRouter
