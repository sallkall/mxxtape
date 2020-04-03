import {message} from "antd";

// validate email
export const checkValidEmail = (email) => {
    // regex for email taken from https://emailregex.com
    const isEmailAddress = email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!isEmailAddress){
        message.error('You must enter a valid email address!')
    }
    return isEmailAddress;
};

//check user exists
export const changePassword = (username, password, confirm) => {
    console.log("changePassword", username, password, confirm);

    if (password !== confirm) {
        message.error('Passwords don\'t match!');
        return
    }

    const request = new Request("/users/password", {
        method: "post",
        body: JSON.stringify({
            username: username,
            password: password,
            confirmation: confirm
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json){
                if (json.username === username){
                    message.success("Password change successful!")
                }
            } else {
                message.error(username + ' doesn\'t exist!');
            }
        })
        .catch(error => {
            console.log("checkUsernameError...", request, error);
        });
};

export const changeEmail = (username, email, comp, callback) => {
    console.log("changeEmail", username, email);

    const request = new Request("/users/email", {
        method: "post",
        body: JSON.stringify({
            username: username,
            email: email
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json){
                if (json.username === username && json.email !== undefined){
                    message.success("Email changed successfully!");
                    comp.state ? comp.setState({"email":json.email}, () => callback()) : console.log("no state to set");
                }
            } else {
                message.error('Email change was unsuccessful');
            }
        })
        .catch(error => {
            console.log("changeEmailError...", request, error);
        });
};

export const getUserSettings = (username, comp, callback) => {
    console.log("getUserSettings", username, comp);

    const url = "/users/settings/" + username;

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json) {
                // get current user and type, default 1 as regular user
                comp.setState({user: json}, () => callback());
            }
        })
        .catch(error => {
            console.log(url, "error", error);
        });
};

export const changeDisplayName = (username, displayName, comp, callback) => {
    console.log("changeDisplayName", username, displayName);

    const url = "/users/settings/display-name";

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify({
            username: username,
            displayName: displayName
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json){
                if (json.username === username && json.displayName !== undefined){
                    message.success("Display name changed successfully!");
                    comp.state ? comp.setState({"displayName":json.displayName}, () => callback()) : console.log("no state to set");
                }
            } else {
                message.error('Display name change was unsuccessful');
            }
        })
        .catch(error => {
            console.log("changeDisplayNameError...", request, error);
        });
};

export const changeAbout = (username, about, comp, callback) => {
    console.log("changeAbout", username, about);

    const url = "/users/settings/about";

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify({
            username: username,
            about: about
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json){
                if (json.username === username && json.about !== undefined){
                    message.success("About changed successfully!");
                    comp.state ? comp.setState({"about":json.about}, () => callback()) : console.log("no state to set");
                }
            } else {
                message.error('About change was unsuccessful');
            }
        })
        .catch(error => {
            console.log("changeAboutError...", request, error);
        });
};