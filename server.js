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
// I may add stuff in here
app.post("/save-stripe-token", (req, res) => {
  res.send(JSON.stringify({ success: true }));
});

// multer
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads/" });
reloadMagic(app);

//cookie
let cookieParser = require("cookie-parser");
app.use(cookieParser());

// variables
// sessions = {sessionId: emailId}
let sessions = {};

app.use("/", express.static("build")); // Needed for the HTML and JS files

app.use("/uploads", express.static("uploads")); // Needed for local assets
app.use("/images", express.static("images"));

// Your endpoints go after this line
//app.post create/update a resource and send it back after
// loveit
app.post("/add-a-loveIt", upload.none(), (req, res) => {
  console.log("req.body", req.body);

  let numberOfLoveIt = parseInt(req.body.loveItNumber);

  // dbo.collection("items").findOne({});
  dbo.collection("items").updateOne(
    { _id: ObjectID(req.body.itemId) },
    {
      $inc: {
        loveIt: numberOfLoveIt
      }
    },
    (err, result) => {
      if (err) {
        console.log("error", err);
        res.send("fail");
        return;
      }
      res.send(JSON.stringify({ success: true }));
      return;
    }
  );
});

// search item
app.post("/search-item", (req, res) => {
  console.log("item = req.body.name", req.body.name);
  dbo
    .collection("items")
    .findOne({ name: req.body.name })
    .toArray((err, item) => {
      if (err) {
        console.log("error", err);
        res.send("fail");
        return;
      }
      console.log("item", item);
      res.send(JSON.stringify(item));
    });
});

// signup
app.post("/signup", upload.none(), (req, res) => {
  console.log("**** I'm in the signup endpoint");
  console.log("this is the body", req.body);

  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;

  dbo.collection("users").findOne({ email: email }, (err, expectedemail) => {
    console.log("expectedemail", expectedemail);
    if (err) {
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (expectedemail === undefined || expectedemail === null) {
      dbo.collection("users").insertOne({
        email: email,
        username: username,
        password: sha1(password)
      });
      res.send(JSON.stringify({ success: true }));
      return;
    }
    if (expectedemail !== undefined) {
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

  let email = req.body.email;
  let enteredPassword = req.body.password;

  dbo.collection("users").findOne({ email: email }, (err, user) => {
    console.log("email", email);
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

      sessions[sessionId] = user.email;
      console.log("sessions", sessions);
      res.send(
        JSON.stringify({
          success: true
        })
      );
      return;
    }
    res.send(JSON.stringify({ success: false }));
  });
});

// new-item
app.post("/new-item", upload.single("itemImage"), (req, res) => {
  console.log("request to /new-item body", req.body);
  console.log(req.file);
  let filePath;
  let name = req.body.name;
  let cost = parseInt(req.body.cost);
  let description = req.body.description;
  let review = "";
  let available_quantity = parseInt(req.body.available_quantity);

  if (req.file !== undefined) {
    filePath = "/uploads/" + req.file.filename;
  }

  dbo.collection("items").insertOne({
    filePath: filePath,
    name: name,
    cost: cost,
    description: description,
    available_quantity: available_quantity,
    review: []
  });
  res.send(
    JSON.stringify({
      success: true
    })
  );
});

// logout
app.post("/logout", upload.none(), (req, res) => {
  console.log("logout");
  console.log("sessions", sessions);
  let sessionId = req.cookies.sid;
  console.log("sessionId", sessionId);
  let currentUser = sessions[sessionId];
  // delete cart
  dbo.collection("cart").deleteMany(
    {
      email: currentUser
    },
    (err, result) => {
      if (err) {
        console.log("error", err);
        res.send("fail");
        return;
      }
      res.send(
        JSON.stringify({
          success: true
        })
      );
      return;
    }
  );

  // delete cookie
  delete sessions[sessionId];
  console.log("sessions", sessions);
});

// app.get retrieves information and send it back after
// items - populate the database
app.get("/items", (req, res) => {
  // console.log("request to all items");
  dbo
    .collection("items")
    .find({})
    .toArray((err, items) => {
      if (err) {
        console.log("error", err);
        res.send("fail");
        return;
      }
      // console.log("items", items);
      res.send(JSON.stringify(items));
    });
});

// retrieve all items in cart
app.get("/cart-items", (req, res) => {
  let sessionId = req.cookies.sid;
  let currentUser = sessions[sessionId];
  dbo
    .collection("cart")
    .find({ email: currentUser })
    .toArray((err, cartItems) => {
      if (err) {
        console.log("error", err);
        res.send("fail");
        return;
      }
      res.send(JSON.stringify(cartItems));
    });
});

// cart
app.post("/update-quantity-cart", upload.none(), (req, res) => {
  let sessionId = req.cookies.sid;
  let user = sessions[sessionId];
  console.log("req.body.quantity", req.body.quantity);
  let quantityToRestore = parseInt(req.body.quantity);
  console.log("quantityToRestore", quantityToRestore);
  dbo.collection("cart").updateOne(
    { itemId: ObjectID(req.body.itemId), email: user },
    {
      $inc: {
        quantity: quantityToRestore
      }
    }
  );
});

app.post("/remove-from-cart", upload.none(), (req, res) => {
  let sessionId = req.cookies.sid;
  let user = sessions[sessionId];
  dbo
    .collection("cart")
    .deleteOne(
      { itemId: ObjectID(req.body.itemId), email: user },
      (err, result) => {
        if (err) {
          console.log("error", err);
          res.send("fail");
          return;
        }
        res.send(
          JSON.stringify({
            success: true
          })
        );
        return;
      }
    );
});
app.post("/add-to-cart", upload.none(), (req, res) => {
  let sessionId = req.cookies.sid;
  let currentUser = sessions[sessionId];
  let quantity = parseInt(req.body.quantity);
  dbo
    .collection("items")
    .findOne({ _id: ObjectID(req.body.itemId) }, (err, item) => {
      if (err) {
        console.log("error", err);
        res.send("fail");
        return;
      }
      // update quantity in items collection
      let quantityToRestore = quantity;
      console.log("quantityToRestore", quantityToRestore);
      dbo.collection("items").updateOne(
        { _id: ObjectID(req.body.itemId) },
        {
          $inc: {
            available_quantity: -quantityToRestore
          }
        }
      );

      dbo
        .collection("cart")
        .findOne(
          { itemId: ObjectID(req.body.itemId), email: currentUser },
          (err, cartItem) => {
            if (err) {
              console.log("error", err);
              res.send("fail");
              return;
            }
            console.log("item._id", item._id);
            if (cartItem === null) {
              dbo.collection("cart").insertOne({
                // itemId: req.body.itemId,
                itemId: item._id,
                email: currentUser,
                name: item.name,
                quantity: quantity
              });
              res.send(
                JSON.stringify({
                  success: true
                })
              );
              return;
            }
            if (cartItem !== null) {
              dbo.collection("cart").updateOne(
                { _id: ObjectID(cartItem._id) },
                {
                  $inc: {
                    quantity: quantity
                  }
                }
              );
              res.send(
                JSON.stringify({
                  success: true
                })
              );
              return;
            }
          }
        );
    });
});

// delete cart and create history cart
app.post("/checkout", upload.none(), (req, res) => {
  let sessionId = req.cookies.sid;
  let currentUser = sessions[sessionId];

  dbo
    .collection("cart")
    .find({ email: currentUser })
    .toArray((err, cartItems) => {
      if (err) {
        console.log("error", err);
        res.send("fail");
        return;
      }
      console.log({ cartItems });

      // update quantity in items collection
      cartItems.map(cartItem => {
        let quantityToRestore = cartItem.quantity;
        console.log("cartItem.quantity", cartItem.quantity);
        dbo.collection("items").updateOne(
          { _id: ObjectID(cartItems.itemId) },
          {
            $inc: {
              quantity: -quantityToRestore
            }
          }
        );
      });
    });

  // delete cart
  dbo.collection("cart").deleteMany({ email: currentUser }, (err, result) => {
    if (err) {
      console.log("error", err);
      res.send("fail");
      return;
    }
    res.send(
      JSON.stringify({
        success: true
      })
    );
    return;
  });
});

// reviews
app.post("/reviews", upload.none(), (req, res) => {
  console.log("our review: ", req.body.review);
  let review = req.body.review;
  let sessionId = req.cookies.sid;
  let currentUser = sessions[sessionId];

  dbo.collection("items").updateOne(
    { _id: ObjectID(req.body.itemId) },
    {
      $push: {
        review: {
          username: currentUser,
          message: review
        }
      }
    }
  );
  res.send(
    JSON.stringify({
      success: true
    })
  );
  return;
});

// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
