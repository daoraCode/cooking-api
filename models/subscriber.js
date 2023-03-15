const { mongoose, Schema } = require('mongoose');

const subscriberSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    zipCode: {
      type: Number,
      min: [10000, 'Zip code Postal too short'],
      max: 99999,
    },
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  },
  {
    timestamps: true,
})

// subscriberSchema.post('create', async function(tweet)

module.exports = mongoose.model('Subscriber', subscriberSchema);
