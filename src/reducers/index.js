import { combineReducers } from 'redux'

import {
    GET_POSTS,
    GET_POST,
    UPVOTE_POST,
    DOWNVOTE_POST,
    GET_COMMENTS,
    UPDATE_COMMENT,
    UPVOTE_COMMENT,
    DOWNVOTE_COMMENT,
    GET_CATEGORIES,
  } from '../actions'

function posts(state = {}, action){
    switch(action.type){
        case GET_POSTS:
            let posts = {}
            action.posts.forEach(({
                  id,
                  timestamp,
                  title,
                  author,
                  body,
                  category,
                  voteScore,
                  deleted,
                  commentCount
                }) =>{
                    posts[id] = {
                        timestamp,
                        title,
                        author,
                        body,
                        category,
                        voteScore,
                        deleted,
                        commentCount,
                    }
                }
            )
            return posts
        default:
            return state
    }
}

function categories(state = {}, action){
    switch(action.type){
        case GET_CATEGORIES:
            let categories = {}
            action.categories.forEach(({ name, path }) => {
                categories[name] = {path,}
            })
            return categories
        default:
            return state
    }
}



export default combineReducers({
    posts,
    categories,
})