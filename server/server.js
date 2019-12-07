const express = require('./config/express.js')
 
const app = express.init()
app.listen(process.env.PORT || 5000, () => console.log(`Server now running on port 3000!`));
