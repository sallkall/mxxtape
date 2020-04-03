
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
            res.send({ currentUser: user.username });
        })
        .catch(error => {
            res.status(400).send()
        });
});

// A route to logout a user
app.get("/users/logout", (req, res) => {
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
    if (req.session.user) {
        res.send({ currentUser: req.session.username });
    } else {
        res.status(401).send();
    }
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
        password: req.body.password
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


/**
 * Request body should contain the new star song.
 */
app.post("/users/:username/starsong", (req, res) => {
    const username = req.params.username;
    User.findOne({username: username}).then(
        user => {
            user.starsong = req.body.starsong;
            user.save();
            res.send(user);
        }, error => {
            res.status(400).send(error);
        }
    )
});
app.post("/users/:username/history", (req, res) => {
    const username = req.params.username;
    User.findOne({username: username}).then(
        user => {
            if(user.history.indexOf(req.body.song) > -1) {
                user.history.splice(user.history.indexOf(req.body.song), 1);
            }
            user.history.push(req.body.song);
            user.save();
            res.send(user);
        }, error => {
            res.status(400).send(error);
        }
    )
});
app.delete("/users/:username/history", (req, res) => {
    const username = req.params.username;
    User.findOne({username: username}).then(
        user => {
            user.history.splice(user.history.indexOf(req.body.song), 1);
            user.save();
            res.send({"history": user.history});
        }, error => {
            res.status(400).send(error);
        }
    )
});
app.post("/users/:username/subscriptions", (req, res) => {
    const username = req.params.username;
    User.findOne({username: username}).then(
        user => {
            if(user.subscriptions.indexOf(req.body.community) === -1) {
                user.subscriptions.push(req.body.community);
            }
            user.save();
            res.send(user);
        }, error => {
            res.status(400).send(error);
        }
    )
});
app.delete("/users/:username/subscriptions", (req, res) => {
    const username = req.params.username;
    User.findOne({username: username}).then(
        user => {
            user.subscriptions.splice(user.subscriptions.indexOf(req.body.community), 1);
            user.save();
            res.send({"subscriptions": user.subscriptions});
        }, error => {
            res.status(400).send(error);
        }
    )
});
app.get("/users/:username/profiledata", (req, res) => {
    const username = req.params.username;
    User.findOne({username: username}).then(
        user => {
            if(user !== null) {
                res.send(
                    {
                        "exists": true,
                        "starsong": user.starsong,
                        "history": user.history,
                        "subscriptions": user.subscriptions
                    });
            } else {
                res.status(404).send(
                    {
                        "exists": false,
                        "starsong": "",
                        "history": [],
                        "subscriptions": []
                    }
                );
            }
        }, error => {
            res.status(400).send(error);
        }
    )
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
