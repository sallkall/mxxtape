
"use strict";
const log = console.log;
const express = require("express");
const app = express();

//TODO: This code is more or less pulled directly from the example, and needs a lot of tweaking.

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false);

// import the mongoose models
const { User } = require("./models/user");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

/*** Session handling **************************************/
// Create a session cookie
app.use(
    session({
        secret: "oursecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        }
    })
);

// A route to login and create a session
app.post("/users/login", (req, res) => {
    log("/users/login", req.body);
    const username = req.body.username;
    const password = req.body.password;

    // Use the static method on the User model to find a user
    // by their email and password
    User.findUser(username, password)
        .then(user => {
            // Add the user's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            req.session.username = user.username;
            req.session.type = user.type;
            res.send({ currentUser: user.username, type: user.type });
        })
        .catch(error => {
            res.status(400).send()
        });
});

// A route to logout a user
app.get("/users/logout", (req, res) => {
    log("get /users/logout");
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});

// A route to check if a use is logged in on the session cookie
app.get("/users/check-session", (req, res) => {
    log("/users/check-session", req.body);
    if (req.session.user) {
        res.send({ currentUser: req.session.username, type: req.session.type });
    } else {
        res.status(401).send();
    }
});

// route to change user's password
app.post("/users/password", (req, res) => {
    log("/users/password", req.body);
    const username = req.body.username;
    const password = req.body.password;
    const confirm = req.body.confirmation;

    User.findUserByUsername(username)
        .then(user => {
            if (password === confirm){
                user.password = req.body.password;
                user.save().then(
                    user => {
                        res.send({username: user.username})
                    },
                    error => {
                        res.status(400).send(error); // 400 for bad request
                    }
                )
            } else {
                res.status(401).send(); // 401 for invalid confirmation
            }
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

/*********************************************************/

/*** API Routes below ************************************/
// TODO: The JSON routes (/students) are not protected (no authentication required).
//       You can (and should!) add this using similar middleware techniques we used in lecture.

/** User routes below **/
// Set up a POST route to *create* a user of your web app (*not* a student).
app.post("/users", (req, res) => {
    log(req.body);

    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        type: req.body.type
    });

    // Save the user
    user.save().then(
        user => {
            res.send(user);
        },
        error => {
            res.status(400).send(error); // 400 for bad request
        }
    );
});

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + "/mxxtape/build"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/mxxtape/build/index.html");
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});
