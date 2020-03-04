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

## Operating the app as a user

## Operating the app as an admin


# Community Pages Instructions:

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
- can upload an avatar to the community 