var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var appointmentsRouter = require("./routes/appointments");
var authRouter = require("./routes/auth");
var doctorsRouter = require("./routes/doctors");
var clinicsRouter = require("./routes/clinics");
var patientsRouter = require("./routes/patients");
var dotenv = require("dotenv");
dotenv.config();

//connect database
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Database is Connected");
  } catch (err) {
    console.log("MongoDB Database is connection failed");
    console.log(err);
  }
};

connectDB(); // vervying db connection
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1", indexRouter);
app.use("/api/v1/patients", patientsRouter);
app.use("/api/v1/doctors", doctorsRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/clinics", clinicsRouter);
app.use("/api/v1/appointments", appointmentsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
