require("dotenv").config();
const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors");

const dbConfig = require("./config/db.config"),
  db = require("./models");

const { initializeDB } = require("./utils/initializeDB");

const URI = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,
  app = express(),
  corsOptions = {
    origin: ["http://localhost:3000"],
  };

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(function (_req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

db.mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connected to MongoDb");
    initializeDB();
  })
  .then(() => {
    console.log("DB initialized");
  })
  .catch((err) => {
    console.error("Connection err", err);
    process.exit;
  });

app.use(function handleDatabaseError(error, request, response, next) {
  if (error instanceof db.mongoose.Error) {
    return response.status(500).json({
      type: "MongoError",
      message: error.message,
    });
  }
  next(error);
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/order.routes")(app);
require("./routes/client.routes")(app);
require("./routes/driver.routes")(app);
require("./routes/photos.routes")(app);

app.get("/", (_req, res) => res.send("Hello World!"));

const PORT = process.env.PORT || 2312;

app.listen(PORT, () => console.log(` ${PORT}! is Live`));
