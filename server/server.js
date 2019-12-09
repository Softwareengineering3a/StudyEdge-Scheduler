const express = require('./config/express.js')
 
// Use env port or default
const port = process.env.PORT || 5000;

const app = express.init()
//Have server listen for specified port 
app.listen(port, () => console.log(`Server now running on port ${port}!`));
