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