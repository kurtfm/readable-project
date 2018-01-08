# Readable Project

This project was created and submitted as the first project in the Udacity React Nanodegree.  The project utilizes the provided server/APIs to complete the requirements.


## Run Project Locally

Clone this repo.
```bash
git clone https://github.com/kurtfm/readable-project.git
```

Change directory into the project and install requirements.
```bash
npm install
```

Start development server and API server
```bash
npm start both
```

The default browser should open to http://localhost:3000/ and show the main page of the project.

## Requirements / Features
The overall requirement for the project:
> For the Readable project, you will build a content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

- Uses provided APIs to get initial data and Redux to manage state.
- As changes are made the APIs are called and the state is updated.

### Main view
endpoint: http://localhost:3000/

- Lists all posts posts with title, author, comment number and vote score
- Post summary title links to Post detail view (below)
- Can filter on category which will trigger Category view (below)
- Can sort on time, author, title, and vote count (ascending/descending)
- Can up/down vote, edit, delete a post listed
- Can add a new post

### Post detail view
endpoint: http://localhost:3000/:id


### Category view
http://localhost:3000/category/:category

- Lists all posts in a given category
- Post detail links use the Category post detail view below

### Category post detail view
http://localhost:3000/category/:category/:id

- Show the Post detail view for a post in a specific category