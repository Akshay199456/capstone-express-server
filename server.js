const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const cors           = require('cors');
const session        = require('express-session')

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

app.use('/api/v1/auth', authController);

app.listen(9000, () => {
  console.log('listening on port 9000');
});