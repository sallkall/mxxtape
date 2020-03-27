//From example
export const readCookie = (app) => {
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
    console.log("logging in", loginComp.state);
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