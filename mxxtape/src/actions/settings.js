import {message} from "antd";

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
                if (json.username !== undefined){
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
                if (json.username !== undefined && json.email !== undefined){
                    message.success("Email changed successfully!");
                    comp.state ? comp.setState({"email":json.email}, () => callback()) : console.log("no state to set");
                }
            } else {
                message.error('Email change was unsuccessful');
            }
        })
        .catch(error => {
            console.log("checkUsernameError...", request, error);
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
                if (json.username !== undefined && json.displayName !== undefined){
                    message.success("Display Name changed successfully!");
                    comp.state ? comp.setState({"displayName":json.displayName}, () => callback()) : console.log("no state to set");
                }
            } else {
                message.error('Email change was unsuccessful');
            }
        })
        .catch(error => {
            console.log("checkUsernameError...", request, error);
        });
};