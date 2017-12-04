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
            return {
                ...state,
                [posts]: action.posts
            }
        default:
            return state
    }
}

function categories(state = {}, action){
    switch(action.type){
        case UPDATE_CATEGORIES:
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