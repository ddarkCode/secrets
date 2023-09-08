require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const {connect} = require('mongoose');
const ejs = require('ejs');

const pageRouter = require('./routes/pages/pageRouter');
const userRouter = require('./routes/userRoutes')

const {PORT, MONGO_URL} = process.env;
const log = console.log;

const app = express();

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

app.use('/', pageRouter());
app.use('/api/users', userRouter())

app.get('/api/posts', (req, res) => {
    res.json(['Orange', 'White', 'Mango', 'Po'])
})




app.listen(PORT, () => {
    log('Server started on port:' + PORT);
})
