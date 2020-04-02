//From example
import {message} from "antd";

export const readCookie = (app) => {
    console.log("readCookie", app.state);
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
                app.setState({currentUser: json.currentUser, loggedIn: json.type});
            }
        })
        .catch(error => {
            console.log(url, "error", error);
        });
};

// handle login
export const login = (loginComp, app) => {
    console.log("login", loginComp.state);
    // Create our request constructor with all the parameters we need

    const request = new Request("/users/login", {
        method: "post",
        body: JSON.stringify({
            username: loginComp.state.username,
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
            if (json.currentUser !== undefined) {
                // if current user exists, then set the state and the type of user
                app.setState({currentUser: json.currentUser, loggedIn: json.type}, ()=>console.log(app));
            }
        })
        .catch(error => {
            console.log("login catch error", request, error);
        });
};

//register a new user
export const registerNewUser = (registerComp, history) => {
    console.log("registerNewUser", registerComp.state);
    // Create our request constructor with all the parameters we need

    const request = new Request("/users", {
        method: "post",
        body: JSON.stringify({
            email: registerComp.state.email,
            username: registerComp.state.username,
            password: registerComp.state.password
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
            if (json) {
                if (json.username !== undefined){
                    message.success('Registration Successful! Please login to continue');
                    history.push('/');
                } else {
                    message.error('Something went wrong, try again later');
                    history.push('/');
                }
            } else {
                message.error('Bad Request! Someone with this email or username already exists!');
            }
        })
        .catch(error => {
            console.log("register catch error", request, error);
            message.error('Something went wrong, try again later');
        });
};

// handle logout
export const logout = (app) => {
    console.log("action: logging out!", app);

    fetch("/users/logout")
        .then(res => {
            app.setState({
                currentUser: null,
                loggedIn: null,
                message: {type: "", body: ""}
            });
        })
        .catch(error => {
            console.log(error);
        });
};