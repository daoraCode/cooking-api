const { mongoose, Schema, model } = require('mongoose')

const courseSchema = Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
  },
    description: {
      type: String,
      required: true
  },
    maxStudents: {
      type: Number,
      default: 0,
      min: [0, "Course model cannot have negative value of students"]
  }, 
    cost: {
      type: Number,
      default: 0,
  },
    students: {
        type: Schema.Types.ObjectId, ref: 'Subscriber'
  }
})

// updates user by removing each courses that it doesn't want to be subscribed any longer
courseSchema.post('findOneAndDelete', async function(course) {
  await model('User').findByIdAndUpdate(
    { _id: course.students },
    { $pull: { courses: course._id } }
  )
})

// after saving course for subscription of user, updates user by add/pushing course'id who've just been subscribed in
courseSchema.post('save', async function (course) {
  await model('User').findByIdAndUpdate(
    { _id: course.students },
    { $push: { courses: course._id } }
  )
})

module.exports = mongoose.model('Course', courseSchema)
