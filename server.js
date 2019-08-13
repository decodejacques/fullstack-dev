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

// hash passwords using sha1
let sha1 = require("sha1");

// stripe
// to be added...

// multer
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads/" });
reloadMagic(app);

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/uploads", express.static("uploads")); // Needed for local assets

// variables
// sessions = {sessionId: usernameId}
let sessions;

// Your endpoints go after this line
//app.post create/update a resource and send it back after

// signup
app.post("/signup", upload.none(), (req, res) => {
  console.log("**** I'm in the signup endpoint");
  console.log("this is the body", req.body);

  let username = req.body.username;
  let password = req.body.password;

  dbo
    .collection("users")
    .findOne({ username: username }, (err, expectedUsername) => {
      console.log("expectedUsername", expectedUsername);
      if (err) {
        res.send(JSON.stringify({ success: false }));
        return;
      }
      if (expectedUsername === undefined || expectedUsername === null) {
        dbo
          .collection("users")
          .insertOne({ username: username, password: sha1(password) });
        res.send(JSON.stringify({ success: true }));
        return;
      }
      if (expectedUsername !== undefined) {
        res.send(JSON.stringify({ success: false }));
        return;
      }
      res.send(JSON.stringify({ success: false }));
    });
});

// generate cookie
let generateId = () => {
  return "" + Math.floor(Math.random() * 100000000);
};

// login
app.post("/login", upload.none(), (req, res) => {
  console.log("**** I'm in the login endpoint");
  console.log("this is the parsed body", req.body);

  let username = req.body.username;
  let enteredPassword = req.body.password;

  dbo.collection("users").findOne({ username: username }, (err, user) => {
    console.log("username", username);
    console.log("enteredPassword", req.body.password);
    console.log("users");
    if (err) {
      console.log("error", err);
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (user === null || user === undefined) {
      console.log("user === null");
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (user.password === sha1(enteredPassword)) {
      console.log("correct password");
      let sessionId = generateId();
      console.log("generated id", sessionId);
      res.cookie("sid", sessionId);

      // this needs to be verified by a coach
      let userId = dbo
        .collection("users")
        .findOne(
          { _id },
          { username: username, password: sha1(enteredPassword) }
        );
      console.log("userId", userId);
      sessions[sessionId] = userId;
      res.send(JSON.stringify({ success: true }));
      return;
    }
    res.send(JSON.stringify({ success: false }));
  });
});

// new-item
app.post("/new-item", upload.single("itemImage"), (req, res) => {
  console.log("request to /new-item body", req.body);
  let filePath;
  let name = req.body.name;
  let cost = req.body.cost;
  let description = req.body.description;
  let available_quantity = req.body.available_quantity;

  if (req.file !== undefined) {
    filePath = "/uploads/" + req.file.filename;
  }

  dbo.collection("items").insertOne({
    filePath: filePath,
    name: name,
    cost: cost,
    description: description,
    available_quantity: available_quantity
  });
  res.send(
    JSON.stringify({
      success: true
    })
  );
});

// display-items
// app.post("/items", (req, res) => {});

// logout
app.post("/logout", upload.none(), (req, res) => {
  console.log("logout");
  let sessionId = req.cookies.sid;
  console.log("sessionId", sessionId);

  delete sessions[sessionId];
  console.log("sessions", sessions);
});

// add to cart
//TBD...
// app.get('/add-to-cart', (req, res)=>{})
//app.post('/orders/:id', (req, res)=>{})

// app.get retrieves information and send it back after
// items - populate the database
app.get("/items", (req, res) => {
  console.log("request to all items");
  dbo
    .collection("items")
    .find({})
    .toArray((err, items) => {
      if (err) {
        console.log("error", err);
        res.send("fail");
        return;
      }
      console.log("items", items);
      res.send(JSON.stringify(items));
    });
});

// reviews
// likes

// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
