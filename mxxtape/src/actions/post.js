// A function to send a POST request with a new post
export const addPost = (formComp, feedComp, callback) => {
// export const addPost = (formComp, feedComp) => {
    // the URL for the request
    console.log(formComp)
    const url = "/posts";

    // Create request with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(formComp),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    console.log(request.body);

    // Send the request
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                feedComp.setState({
                    message: {
                        body: "Success: Added a post.",
                        type: "success"
                    }
                // })
                }, () => {callback(); console.log("addPost success", feedComp.state)});
            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                feedComp.setState({
                    message: {
                        body: "Error: Could not add post.",
                        type: "error"
                    }
                // })
                }, () => {callback(); console.log("addPost error", feedComp.state)});
            }
        })
        .catch(error => {
            console.log(error);
            callback();
        });
};

export const getFeed = (posts) => {
    const url = "/posts";
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get community posts");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            // posts.setState({ posts: json.posts });
            posts.setState({ posts: json.posts, loadingFeed: false }, () => {
                console.log(posts.state)
            });
        })
        .catch(error => {
            console.log(error);
        });
};

export const updateLikes = (post, id) => {
    // the URL for the request
    const url = "/posts/" + id + "/likes";

    const request = new Request(url, {
        method: "post",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get community posts yo");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            post.setState({ likes: json.likes });
        })
        .catch(error => {
            console.log(error);
        });
};
