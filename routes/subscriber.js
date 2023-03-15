const subscriberRouter = require('express').Router()

const { 
  register, 
  getSubscribers, 
  getSubscriber, 
  updateSubscriber, 
  deleteSubscriber 
} = require('../controllers/subscriberController.js')

subscriberRouter.post('/create', register)
subscriberRouter.get('/all', getSubscribers)
subscriberRouter.get('/:id', getSubscriber)
subscriberRouter.put('/:id/update', updateSubscriber)
subscriberRouter.delete('/:id/delete', deleteSubscriber)

module.exports = subscriberRouter
