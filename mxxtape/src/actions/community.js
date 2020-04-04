import {message} from "antd";

// make new community
export const registerNewCommunity = (registerComp, history) => {
    console.log("registerNewCommunity", registerComp.state);

    const request = new Request("/register-new-community", {
        method: "post",
        body: JSON.stringify({
            name: registerComp.state.name,
            //need to get them as list of strings
            genres: registerComp.state.genres,
            description: registerComp.state.description,
            //need to get the users....before passing in this way...
            moderators: registerComp.state.moderators
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
                if (json.name !== undefined){
                    message.success(`New Community ${json.name} Registration Successful!`);
                    history.push('/');
                } else {
                    message.error('Something went wrong, try again later');
                    history.push('/');
                }
            } else {
                message.error('Bad Request!');
            }
        })
        .catch(error => {
            console.log("register catch error", request, error);
            message.error('Something went wrong, try again later');
        });
};

export const parseTaggedUsers = (toParse) => {
    if (!toParse) return [];
    const regex = /@([\w.-])+/g;
    const parsed = toParse.match(regex);
    if (parsed) parsed.forEach((user, i) => parsed[i] = user.slice(1, user.length));
    console.log("parseTaggedUsers", parsed);
    return parsed
};

export const parseWords = (toParse) => {
    if (!toParse) return [];
    const regex = /([\w.-])+/g;
    const parsed = toParse.match(regex);
    return parsed ? parsed : []
};

// fetch all users
export const loadUsers = (key, comp) => {
    console.log('loadUsers', comp);
    if (!comp) return;

    if (!key) {
        comp.setState({users: []});
        return
    }

    if (comp.state.search !== key) return;

    const url = "/users/q="+key;
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        // .then(json => {console.log(url, "returned", json); return json;})
        .then(json => {
            if (json && comp.state && comp.state.search === key) {
                comp.setState({users: json, loading: false})
            }
        })
};