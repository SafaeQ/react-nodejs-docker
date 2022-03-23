const express = require("express");
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();
app.use(cors())
const connect = require("./connection/connect");

const adminRouter = require("./routes/admin");
const ownerRouter = require("./routes/owner");
const customerRouter = require("./routes/customer");
const roomRouter = require('./routes/room')

const MongoDbStore = mongoDbStore(session);
const sessionStore = new MongoDbStore({
  uri: "mongodb://127.0.0.1:27017",
  databaseName: "hotel-booking-2",
  collection: "sessions",
});

app.disable("x-powered-by");

const path = require('path')
app.use("/rooms/image",express.static(path.join(__dirname, 'rooms')))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      httpOnly: false,
    },
  })
);
app.use("/admin", adminRouter);
app.use("/owner", ownerRouter);
app.use("/customer", customerRouter);
app.use('/api', roomRouter)
app.use(function (error, req, res, next) {
  console.log(error);
  res.send({ message: "Oops something goes wrong!" });
});

connect()
  .catch((err) => {
    throw err;
  })
  .then(() => {
    app.listen(process.env.PORT, console.log("🚀 App is running"));
  });
