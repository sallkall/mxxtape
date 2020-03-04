# team64

## Running the app for the fist time

Follow these steps exactly to build the app for the first time:
1. clone the rep: `git clone https://github.com/csc309-winter-2020/team64.git`
2. navigate to the `mxxtape` folder
3. in the terminal, run:
    1. `npm i`
    2. `npm run-scripts build`
    3. `npm start`
4. the web app should start in your browser at `localhost:3000`

## Login credentials: 

Any other combination will not work

### As user
Username: user

Password: user

### As admin
Username: admin

Password: admin

## GENERAL OPERATION:
- To log in as User: user, user. To log in as Admin: admin, admin.
- Do not refresh the page! Without cookies, refreshing the page will immediately log you out.
- There is no existential check for usernames in URLs, even blank ones will be accepted.
- There is currently only one community - “Jazz it Up” (/community/jazzitup)

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
1. Access by searching `jazz it up` in the search bar. Alternatively, you can scroll down on dashboard and find the `YOUR COMMUNITIES` section and click on `jazz it up` 
	- this should take you to `http://localhost:3000/community/jazzitup`
2. Once the community page for jazz it up, you must *Join Community*, upon doing so you will have the ability to create and post to the community feed
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
- popular tags (this should render based on sever data in phase2, hardcoded for now)
- fake (mocky) member list for now, again will be updated based on server data in phase 2
- leave community will not let you post
- play music, look through reviews and comments 

### Community Page - Admin's View 
(Mostly the same as user's view)

Additional features/differences:
- cannot leave the community

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