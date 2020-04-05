# team64

## Setup and Development

Follow these steps exactly to build the app for the first time:
1. clone the repo: `git clone https://github.com/csc309-winter-2020/team64.git`
2. navigate to the `team64` folder
3. In the terminal create and run local Mongo database in the root directory of the repo
   ``` 
   mkdir mongo-data
   mongod --dbpath mongo-data
   ```
4. In the root directory of the repo (team64):
    ``` 
    # install server dependencies in the root directory
    npm install

    # install frontend dependencies in the mxxtape directory
    cd mxxtape
    npm install
    ```
5. To build the React app and start the server `npm run build-run` in the root directory: 
    ```
    npm run build-run
    ```
The web app should start in your browser at `localhost:5000`

## Login/Populating the Database
#### Creating & Logging in as User :
There are two ways in which you can register and create a user profile: 
1. Using the frontend from:
    - In the initial login page navigate and click on `Register now!`
    - create an account using the input boxes
    ```
    # Sample account creation inputs:
        email: user@user.com
        username: user
        new password: user
        comfirm password: user
    ```
    - submit the creation request by clicking on `Register now!`
 2. Alternately, you can send a `POST` request to `/users`, for example you can use the following json body: 
     ```
     {
        "username": "user",
        "email": "user@user.com",
        "password": "user",
     }
     ```
    
#### Creating & Logging in as Admin :

You can only make an admin account by sending a `POST` request to `/users`. For example, you can use the following json body: 
   ```
     {
        "username": "admin",
        "email": "admin@admin.com",
        "password": "admin",
        "type": 2
     }
   ```
    
## To view db in MongoDBCompass
- connect with the url `mongodb://localhost:27017/`
    
## Phase 2 updates + overview
- Replaced mock data with a MongoDB database
- Built a backend API running an Express server 

We have 4 collections in our `mxxtape` database:
1. communities
    - Containing each community's information such as community name, genre, descriptions and mostly importantly 
    a list of posts (the feed) in the community discussion board
2. posts
    - a nested collection inside communities storing all posts information made in a community 
3. featuredsongs
    - Stores the featured song selected by an admin that is displayed onto all user's dashboard
4. users
    - a collection of user info including login info and subscriptions etc.

# Dashboard:
- The Dashboard is intended as the user’s primary landing page. It contains a user’s ‘starred song’, which they can change, as well as several cards with various other songs. The Featured card is set by the site admin for all users, and contains a song they think is worth sharing. The Recommended card contains various songs from communities the user frequents. The History card contains songs the user has recently listened to, and the Communities card contains the communities the user is subscribed to. The History and Communities cards both contain links to a page with the full list, to save space.

NB: Currently, the default site does not navigate to specific user’s dashboards. To view a specific user, go to /dashboard/[Username]. ‘Connor’ currently has a profile picture.

## Admin Dashboard:
- The Admin Dashboard is a feature-focused dashboard intended to be the admin’s center of attention. The Featured card allows the admin to see the currently featured song, as well as set a new one. The remaining cards are administrative requests sent in by users, which the admin can choose to approve or deny.

## Profile:
- The Profile is intended to be seen by everyone except the person who owns it. A lightweight version of the Dashboard, Profile is intended to give a quick overview of another user’s activity on the site. Lacking any means of customization, it is intended to allow the viewer to see another user’s profile picture, starred song, history, and subscribed communities.

NB: To access, go to /profile/[Username]. ‘Connor’ currently has a profile picture.

### Community Page - Users's View 

#### How to use all the features
1. Using the nav bar dropdown option `Community Creation`, request and create a new community
2. Using the search bar, search for the requested community , this should direct you to the community page
3. Once the community page use *Join Community*, to join, upon doing so you will have the ability to create and post to the community feed
3. *2 Ways to make post*:
	a. Text posts: 
		- You may input upto 140 characters, and content must not be blank (otherwise post cannot be executed)
		- Tags format: `TAG1; TAG2; TAG3; ...` so for example you can have `jazz; it; up;` (*must be separated by `;` and have proper spacing*). *Must* hit enter to process inputted tags.
	b. Music posts:
		- has to be a soundcloud url and url cannot be blank 
		- tags follow the same rule as text posts tags
		- can give a rating out of 5
		
#### Other Features:
- like/dislike a post 
- can sort the feed by most recent or oldest 
- leave community will not let you post
- play music, look through reviews and comments 

#### Community Page - Admin's View 
Similar to how user page works, but cannot leave a community 

____________

## Login Page Features

Login form:

1. fairly straightforward: login with your username and password and click `login`
   1. if you enter an invalid combination you will not be able to enter the app
   2. enter username
   3. enter password
   4. click `log in`
2. will redirect to dashboard of the type of user you logged in as

Register Page:

1. from login page you can navigate to register page
   1. click on `register now!`
2. refresh the window manually
3. enter your information as directed
   1. invalid email addresses will not be accepted
4. click `Register now!` to submit the form
5. will redirect to the login page

Forgot password page:

1. from login page you can navigate to forgot password page
   1. click on `Forgot password`
   2. refresh the window manually
2. enter your information as directed
   1. need to click `Submit` to submit the form
3. will redirect to the login page

## Account settings

1. after login, start at `http://localhost:3000`
2. in top right corner hover over `profile`, click on `Account settings`
   1. will navigate to settings page
3. there will be a form with fields you can modify
4. lcick change to have the option to change these fields
5. only valid submissions for certain fields are allowed:
   1. email can only have email addresses
   2. usernames can't be changed
   3. passwords must match
   4. name, about cna change as needed
   5. can upload an image from your desktop to change your avatar
      1. must be under 2 mb
      2. must be jpeg or png

## Notifications

1. after fresh login, start at `http://localhost:3000`
2. click on the bell (it should have a 3)
   1. will navigate to notifications page
3. a few things you can do here, if you want to try each, restart at 1 each time
   1. mark all notifications as read (click the button)
      1. notifications badge should go awat
   2. go to community with the post
      1. if post was unread, will decrease the read notifications
4. load more notifications (that have already been read)

## create community

1. after login, start at `http://localhost:3000`
2. in top right corner hover over `profile`, click on `Create Communtiy`
   1. will navigate create a community page
3. Enter information as directed
   1. get help by hovering over the question marks