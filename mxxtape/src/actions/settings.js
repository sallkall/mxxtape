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
                    message.success("Password Change Successful! Please login to continue")
                }
            } else {
                message.error(username + ' doesn\'t exist!');
            }
        })
        .catch(error => {
            console.log("checkUsernameError...", request, error);
        });
};