var sessions = require('../controllers/sessionController.js'), 
    express = require('express'), 
    router = express.Router();

router.route('/')
  .get(sessions.list)
  .post(sessions.create);

router.route('/:sessionId')
  .get(sessions.read)
  .put(sessions.update)
  .delete(sessions.delete);

  router.param('sessionId', sessions.sessionByID);

module.exports = router;