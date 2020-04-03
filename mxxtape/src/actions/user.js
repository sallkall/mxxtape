
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
                app.setState({ currentUser: json.currentUser });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const getUserProfile = (username, user_json, react) => {
    fetch("/users/"+username+"/profiledata", {method: 'GET'})
        .then(
            res => {
                return res.json();
            }
        )
        .then(
            json => {
                const original_json = JSON.parse(JSON.stringify(user_json));
                user_json.exists = json.exists;
                user_json.starsong = json.starsong;
                user_json.history = json.history;
                user_json.subscriptions = json.subscriptions;
                if(JSON.stringify(original_json.starsong) !== JSON.stringify(user_json.starsong)) {
                    react.forceUpdate();
                }
            }
        )
        .catch(
            error => {
                console.log(error);
            }
        );
};