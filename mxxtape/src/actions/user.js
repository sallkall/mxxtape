//From example
export const readCookie = (app) => {
    console.log("checking", app.state);
    const url = "/users/check-session";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.currentUser) {
                // get current user and type, default 1 as regular user
                app.setState({currentUser: json.currentUser, loggedIn: json.type ? json.type : 1});
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// handle login
export const login = (loginComp, app) => {
    console.log("logging in");
    console.log(loginComp.state);
    // Create our request constructor with all the parameters we need

    const request = new Request("/users/login", {
        method: "post",
        body: JSON.stringify({
            username : loginComp.state.username,
            password: loginComp.state.password
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json.username !== undefined) {
                // TODO: set to regular user by default
                app.setState({ currentUser: json.username, loggedIn: json.type });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// handle logout
export const logout = (loginComp, app) => {
    console.log(app.state);
    console.log("logging out!");

    fetch("/users/logout")
        .then(res => {
            app.setState({
                currentUser: null,
                loggedIn: null,
                message: { type: "", body: "" }
            });
        })
        .catch(error => {
            console.log(error);
        });
};