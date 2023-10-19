const logger = require('./logger')

const requestLogger = (request, response, next) => {
    if( process.env.NODE_ENV !== 'test'){
        console.log('Method:', request.method)
        console.log('Path:', request.path)
        console.log('body', request.body)
        console.log('--')
    }
    next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name ===  'JsonWebTokenError') {
      return response.status(401).json({ error: error.message })
    }
  
    next(error)
  }
  

module.exports = { requestLogger, errorHandler }