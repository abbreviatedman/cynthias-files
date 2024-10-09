const express = require("express");
const app = express();
const path = require("path");
const logger = require("morgan");
const methodOverride = require("method-override");

const connectToMongoDB = require("./database/mongodb");


const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const mongoStore = require('connect-mongo');
const dotenv = require('dotenv');

dotenv.config();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(logger("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride("_method"));


app.use(cookieParser(process.env.COOKIE_SECRET))

const ONE_DAY = 1000 * 60 * 60 * 24;

app.use(sessions({
    saveUninitialized: true,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie: { maxAge: ONE_DAY },
    // store: mongoStore.create({
    //     mongoUrl: process.env.MONGODB_URI,
    //     collectionName: 'sessions',
    // })
}))

const PicturesRouter = require("./routes/api/pictureRouter");
app.use("/api/Pictures", PicturesRouter);

const userRouter = require('./routes/api/userRouter');
app.use('/api/users', userRouter);

const viewsRouter = require("./routes/viewRouter");
// app.use("/", viewsRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is on ${PORT}`);

  connectToMongoDB();
});
