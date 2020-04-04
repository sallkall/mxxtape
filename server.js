
"use strict";
const log = console.log;
const express = require("express");
const app = express();


// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false);

// import the mongoose models
const { User } = require("./models/user");

const { Post } = require("./models/post");

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
})

/*********************************************************/
/*************    POST API      *************/

app.post("/posts", (req, res) => {
    // log(req.body);
    const type = req.body.post_type;
    let post = null;
    if (type == "text") {
        post = new Post({
            author_id: req.body.author_id,
            avatar: req.body.avatar,
            community_id: req.body.community_id,
            content: req.body.content,
            tags: req.body.tags,
            post_type: req.body.post_type,
            rating: null,
            musicUrl: null,
            likes: 0,
            dislikes: 0,
        });
    } else if (type == "music") {
        post = new Post({
            author_id: req.body.author_id,
            avatar: req.body.avatar,
            community_id: req.body.community_id,
            tags: req.body.tags,
            post_type: req.body.post_type,
            rating: req.body.rating,
            musicUrl: req.body.musicUrl,
            likes: 0,
            dislikes: 0,
        });
    }


    // Save the post to db
    post.save().then(
        result => {
            res.send(result);
        },
        error => {
            res.status(400).send(error); // 400 for bad request
        }
    );
});

// get all posts
app.get('/posts', (req, res)=> {
    Post.find().then(
        posts => {
            res.send({ posts }); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

// get by post id
app.get('/posts/:id', (req, res) => {
    /// req.params has the wildcard parameters in the url, in this case, id.
    // log(req.params.post_id)
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
        return;
    }

    // findById
    Post.findById(id)
        .then((post) => {
            if (!post) {
                res.status(404).send()  // could not find this student
            } else {
                /// sometimes we wrap returned object in another object:
                //res.send({student})
                res.send(post)
            }
    }).catch((error) => {
        res.status(500).send()  // server error
    })
});


// get by post likes
app.post('/posts/:id/likes', (req, res) => {
    /// req.params has the wildcard parameters in the url, in this case, id.
    // log(req.params.post_id)
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
        return;
    }

    // findById
    Post.findById(id)
        .then((post) => {
            if (!post) {
                res.status(404).send()  // could not find this student
            } else {
                /// sometimes we wrap returned object in another object:
                //res.send({student})
                post.likes ++;
                post.save().then(
                    post => {
                        res.send({"likes": post.likes})
                    },
                    error => {
                        res.status(400).send(error);
                    }
                )
            }
        }).catch((error) => {
        res.status(500).send()  // server error
    })
});


app.patch('/posts/:id/', (req, res) => {
    const id = req.params.id;
    const { author_id, avatar, community_id, tags, post_type, rating, musicUrl, likes, dislikes } = req.body;
    const body = { author_id, avatar, community_id, tags, post_type, rating, musicUrl, likes, dislikes };

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    // Update the student by their id.
    Post.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(post => {
            if (!post) {
                res.status(404).send();
            } else {
                res.send(post);
            }
        })
        .catch(error => {
            res.status(400).send(); // bad request for changing the student.
        });
});

/// a DELETE route to remove a student by their id.
app.delete('/posts/:id', (req, res) => {
    const id = req.params.id

    // Validate id
    if (!ObjectID.isValid(id)) {
        res.status(404).send()
        return;
    }

    // Delete a student by their id
    Post.findByIdAndRemove(id).then((post) => {
        if (!post) {
            res.status(404).send()
        } else {
            res.send(post)
        }
    }).catch((error) => {
        res.status(500).send() // server error, could not delete.
    })
});


/************************ END POST API ****************************/



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
