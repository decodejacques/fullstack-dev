let express = require("express");
let app = express();
let reloadMagic = require("./reload-magic.js");

// database MongoDB
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
let dbo = undefined;
let url =
  "mongodb+srv://decode:decode@cluster0-8wcxc.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  dbo = db.db("media-board");
});

// multer
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads/" });
reloadMagic(app);

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/uploads", express.static("uploads")); // Needed for local assets

// Your endpoints go after this line

// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
