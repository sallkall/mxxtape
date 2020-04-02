//
// export const getPosts = (postList) => {
//     // the URL for the request
//     const url = "/post";
//
//     // Since this is a GET request, simply call fetch on the URL
//     fetch(url)
//         .then(res => {
//             if (res.status === 200) {
//                 // return a promise that resolves with the JSON body
//                 return res.json();
//             } else {
//                 alert("Could not get posts");
//             }
//         })
//         .then(json => {
//             // the resolved promise with the JSON body
//             postList.setState({ studentList: json.students });
//         })
//         .catch(error => {
//             console.log(error);
//         });
// };

// A function to send a POST request with a new post
export const addPost = (formComp, feedComp) => {
    // the URL for the request
    console.log(formComp)
    const url = "/post";

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
                });
            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                feedComp.setState({
                    message: {
                        body: "Error: Could not add post.",
                        type: "error"
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
};
