const jwt = require('jsonwebtoken')

// env var
const config = process.env

// middleware used to verify athentication token for each user sign in process
const verifyJWT = (req, res, next) => {
    const authToken = req.body.token || req.query.token || req.headers['x-accedd-token']
    if (!authToken) return res.status(403).send({ message: 'Ivalid Token.' })
    try {
       const decoded = jwt.verify(authToken, config.ACCESS_TOKEN_SECRET)
       req.user = decoded // decoding information from JWT for the user
       return next()
    } catch (err) {
        res.status(401).send({
            success : false,
            message: err.message
        })    
    }
}

module.exports = verifyJWT