const Express = require('express');
const cors = require('cors');   //cors is used to connect frontend and backend
const bodyParser = require('body-parser');

const port = process.env.PORT || 8000;

const app = Express();
//database setup
const db = require('./config/mongoose');


// Use body-parser middleware to handle URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));



//middleware
// assets setup such as - css, images, and javascript
app.use(Express.static('./assets'));

app.use(cors());   //using cors

app.use(Express.json()); // for parsing application/json
//use express router
app.use('/', require('./routes'));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});