import { combineReducers } from 'redux'

import {
    GET_POSTS,
    FILTER_POSTS,
    SORT_POSTS,
    CLEAR_POSTS,
    GET_POST,
    CLEAR_POST,
    UPVOTE_POST,
    DOWNVOTE_POST,
    GET_COMMENTS,
    CLEAR_COMMENTS,
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
        case CLEAR_POSTS:
            return {}
        default:
            return state
    }
}

function filter(state={}, action){
    switch(action.type){
        case FILTER_POSTS:
            return {category: action.filter}
        case SORT_POSTS:
            return {sortBy: action.method}
        default:
            return state
    }
}

function post(state= {}, action){
    switch(action.type){
        case GET_POST:
            return action.post ? action.post : state
        case CLEAR_POST:
            return {}
        default:
            return state
    }
}

function comments(state={}, action){
    switch(action.type){
        case GET_COMMENTS:
            let comments = {}
            action.comments.forEach(({
                id,
                timestamp,
                author,
                body,
                parentId,
                parentDeleted,
                voteScore,
                deleted,
                }) =>{
                    comments[id] = {
                        id,
                        timestamp,
                        author,
                        body,
                        parentId,
                        parentDeleted,
                        voteScore,
                        deleted
                    }
                }
            )
            return comments
        case CLEAR_COMMENTS:
            return {}
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
    filter,
    post,
    categories,
    comments,
})