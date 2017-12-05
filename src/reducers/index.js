import { combineReducers } from 'redux'

import {
    UPDATE_POSTS,
    UPDATE_POST,
    PVOTE_POST,
    DOWNVOTE_POST,
    UPDATE_COMMENTS,
    UPDATE_COMMENT,
    UPVOTE_COMMENT,
    DOWNVOTE_COMMENT,
    UPDATE_CATEGORIES,
  } from '../actions'

function posts(state = {}, action){
    switch(action.type){
        case UPDATE_POSTS:
            const { posts } = action
            let postsObj= {}
            posts.forEach(
                ({id,
                  timestamp,
                  title,
                  author,
                  body,
                  category,
                  voteScore,
                  deleted,
                  commentCount}) =>{
                      console.log(id)
                      postsObj[id] = {
                        timestamp,
                        title,
                        author,
                        body,
                        category,
                        voteScore,
                        deleted,
                        commentCount,
                    }}
            )
            console.log(postsObj)
            return {
                ...state,
                [posts]:postsObj
            }
        default:
            return state
    }
}

function categories(state = {}, action){
    switch(action.type){
        case UPDATE_CATEGORIES:
            const { categories } = action
            return {
                ...state,
                [categories]: action.categories
            }
        default:
            return state
    }
}



export default combineReducers({
    posts,
    categories,
})