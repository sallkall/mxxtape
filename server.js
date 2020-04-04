
"use strict";
const log = console.log;
const express = require("express");
const app = express();


// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false);

// import the mongoose models
const { User } = require("./models/user");
const { Community } = require("./models/user");
const { FeaturedSong } = require("./models/featuredSong");

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

// route to change user's email
app.post("/users/email", (req, res) => {
    log("/users/email", req.body);
    const username = req.body.username;
    const email = req.body.email;

    User.findUserByUsername(username)
        .then(user => {
            user.email = email;
            user.save().then(
                user => {
                    res.send({"username": user.username, "email": user.email})
                },
                error => {
                    res.status(400).send(error); // 400 for bad request
                }
            )
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.get("/users/settings/:username", (req, res) => {
    const username = req.params.username;

    User.findUserByUsername(username)
        .then(user => {
            res.send({
                "username": user.username,
                "email": user.email,
                "displayName": user.displayName,
                "avatar": user.avatar,
                "about": user.about
            })
        })
        .catch(error => {
            res.status(400).send(error);
        });
});

// route to change user's displayName
app.post("/users/settings/display-name", (req, res) => {
    log("/users/settings/display-name", req.body);
    const username = req.body.username;
    const displayName = req.body.displayName;

    User.findUserByUsername(username)
        .then(user => {
            user.displayName = displayName;
            user.save().then(
                user => {
                    res.send({"username": user.username, "displayName": user.displayName})
                },
                error => {
                    res.status(400).send(error); // 400 for bad request
                }
            )
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

// route to change user's displayName
app.post("/users/settings/about", (req, res) => {
    log("/users/settings/about", req.body);
    const username = req.body.username;
    const about = req.body.about;

    User.findUserByUsername(username)
        .then(user => {
            user.about = about;
            user.save().then(
                user => {
                    res.send({"username": user.username, "about": user.about})
                },
                error => {
                    res.status(400).send(error); // 400 for bad request
                }
            )
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
            if(user.history.indexOf(req.body.song) > -1) {
                user.history.splice(user.history.indexOf(req.body.song), 1);
            }
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


// get list of usernames by key
app.get("/users/q=:key", (req, res) => {
    const key = req.params.key;
    User.find(
        { "username": {"$regex": `^${key}`, "$options": "i"} },
        function(err,docs) {
            docs.forEach((user, i) => docs[i] = {username: user.username, avatar: user.avatar});
            res.send(docs.slice(0, 10));
        })
        .catch(error => {
            res.status(400).send(error);
        });
});

/*********************Create Community routes***********************/
app.post("/register-new-community", (req, res) => {
    log("/register-new-community", req.body);
    const {name, genres, description, moderators} = req.body;

    if (!name || !genres || !description || !moderators || genres.length < 1)
        res.status(400).send('Sorry bad inputs');
    else{
        const mods = [];
        log("pre find user", mods);
        moderators.forEach((user) => {
            User.findUserByUsername(user)
                .then(foundUser => {log(foundUser, foundUser.username, foundUser._id); return foundUser})
                .then(foundUser => {mods.push(foundUser._id)})
                .then(() => log("post find user", mods))
                .then(() => {
                    if (mods.length > 0){
                        const community = new Community({
                            name: name,
                            genres: genres,
                            description: description,
                            moderators: mods
                        });
                        log("post create new community", mods);

                        community.save().then(
                            community => {
                                res.send(community);
                            },
                            error => {
                                //bad request!
                                res.status(400).send(error);
                            }
                        )
                    }
                    else res.status(400).send('No mods found?');
                })
                .catch(error => {
                    res.status(404).send(error);
                })
        });
    }
});

app.get("/featuredsong", (req, res) => {
    FeaturedSong.findOne({}).then(
        featured => {
            if(featured===null) {
                res.send({"featuredSong": ""});
            } else {
                res.send({"featuredSong": featured.featuredSong});
            }
        }, error => {
            res.status(400).send(error);
        }
    )
});
app.post("/featuredsong", (req, res) => {
    FeaturedSong.findOne({}).then(
        featured => {
            if(featured===null) {
                featured = new FeaturedSong({featuredSong: req.body.featuredSong});
            } else {
                featured.featuredSong = req.body.featuredSong;
            }
            featured.save();
            res.send({"featuredSong": featured.featuredSong});
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
