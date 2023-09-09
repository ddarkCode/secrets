require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const {connect} = require('mongoose');
const ejs = require('ejs');
const session = require('express-session');

const pageRouter = require('./routes/pages/pageRouter');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/auth');
const passportConfig = require('./passport/passport');

const {PORT, MONGO_URL, SECRET_SENTENCE} = process.env;
const log = console.log;

const app = express();

app.use(session({
    secret: SECRET_SENTENCE,
    resave: false,
    saveUninitialized: false,
}))

passportConfig(app);

(async function connectToMongo(){
    try {
        await connect(MONGO_URL);
        log('Connection To MongoDB Established Successfully.')
    } catch (err) {
        log(`An Error Occurred While Connecting To Database ${err}`);
    }
}())

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(logger('dev'));


app.use('/auth/google', authRouter());
app.use('/', pageRouter());
app.use('/api/users', userRouter())





app.listen(PORT, () => {
    log('Server started on port:' + PORT);
})
