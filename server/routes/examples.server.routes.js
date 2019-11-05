const Sessions = require('../controllers/Sessions.js'),
    express = require('express'), 
    router = express.Router()

router.route('/')
  .get(Sessions.read)
  
module.exports = router;