import { combineReducers } from 'redux'

import {
    GET_POSTS,
    FILTER_POSTS,
    CLEAR_FILTER,
    SORT_POSTS,
    CLEAR_SORT,
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
            return { ...state, category: action.category }
        case CLEAR_FILTER:
            return {...state,category:null}
        case SORT_POSTS:
            return action.hasOwnProperty('method') ? { ...state, sortBy: action.method,} : { ...state,
                orderBy: action.order }
        case CLEAR_SORT:
            return {...state,sortBy:null,orderBy:null}
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