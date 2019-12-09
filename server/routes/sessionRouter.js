var sessions = require('../controllers/sessionController.js'), 
    express = require('express'), 
    router = express.Router();

//Routes requests to '/' to sessions.list if get request and sessions.create if post request
router.route('/')
  .get(sessions.list)
  .post(sessions.create);

//Routes requests to '/:sessionId' to sessions.read if get request, sessions.update if put request, and sessions.delete if delete request
router.route('/:sessionId')
  .get(sessions.read)
  .put(sessions.update)
  .delete(sessions.delete);

router.param('sessionId', sessions.sessionByID);

module.exports = router;