const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const urlRoutes = require('./routes/url');
const { connectToDB } = require('./config/connectDB');
const staticRouter = require('./routes/staticRouter');
const userRoutes = require('./routes/user');
const {restrictToLoggedInUserOnly} = require('./middlewares/auth');

const app = express();
const PORT = 8001;

connectToDB("mongodb://localhost:27017/url-shorter")
.then(()=> console.log("connected to DB"))
.catch(()=> console.log("Failed to connect"));

app.use(express.json()); // for accepting json data
app.use(express.urlencoded({extended : false})); // for accepting form data
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));

app.use('/url', restrictToLoggedInUserOnly, urlRoutes);
app.use('/user', userRoutes);
app.use('/', staticRouter);

app.listen(PORT, () => console.log(`your application is running on port ${PORT}`));