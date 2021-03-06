# Readable Project

This project was created and submitted as the second project in the Udacity React Nanodegree.  The project utilizes the provided server/APIs to complete the requirements.


## Run Project Locally

Clone this repo.
```bash
git clone https://github.com/kurtfm/readable-project.git
```

Change directory into the project and install requirements.
```bash
cd readable-project
npm install
```

Start development server and API server* at once
```bash
npm start
```

*Note: I have included the API Server with this repo please use this for review.

The default browser should open to http://localhost:3000/ and show the main page of the project.

The front end environment and the server may be started seperately (in separate terminal sessions (windows/tabs)) in this order:
```bash
npm run start-server
npm run start-frontend
```

## Requirements / Features
The overall requirement for the project:
> For the Readable project, you will build a content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

### Redux Store / APIs
- Uses provided APIs to get initial data and Redux to manage state.
- As changes are made the APIs are called and the state is updated.
- Additionally the store was used to track filter and sort state across components as well as a modal key (so only one modal would be open at a time)

### Main view
endpoint: http://localhost:3000/

- Lists all posts posts with title, author, comment number and vote score
- Post summary title links to Post detail view (below)
- Can filter on category which will trigger Category view (below)
- Can sort on time, author, title, and vote count (ascending/descending)
- Can up/down vote, edit, delete a post listed
- Can add a new post


### Category view
http://localhost:3000/:category

- Lists all posts in a given category
- Post detail links use the Category post detail view below

### Post detail view
http://localhost:3000/:category/:id

- Show the Post detail view for a post in a specific category
- It will call the API to get post details using the id if there is no store to pull from