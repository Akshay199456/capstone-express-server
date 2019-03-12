const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const cors           = require('cors');
const session        = require('express-session')
const dotenv 		 = require('dotenv').config();


require('./db/db');

app.use(session({
  secret: 'SECRET KEY',
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('public'));

const corsOptions = {
  origin: ['http://localhost:3000'], 
  credentials: true, // This allows the session cookie to be sent back and forth
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));


const authController = require('./controllers/authController');
const resultController = require('./controllers/resultController');
const userController = require('./controllers/userController');

app.use('/api/v1/auth', authController);
app.use('/api/v1/result', resultController);
app.use('/api/v1/user', userController);

app.listen(9000, () => {
  console.log('listening on port 9000');
});