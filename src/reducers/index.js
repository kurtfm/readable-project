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
    GET_COMMENTS,
    CLEAR_COMMENTS,
    GET_CATEGORIES,
    UPDATE_POST_IN_POSTS,
    UPDATE_COMMENT_IN_COMMENTS,
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
        case UPDATE_POST_IN_POSTS:
            const {
                id,
                timestamp,
                title,
                author,
                body,
                category,
                voteScore,
                deleted,
                commentCount,
            } = action.post
            return {...state,
                [id]: {
                    timestamp,
                    title,
                    author,
                    body,
                    category,
                    voteScore,
                    deleted,
                    commentCount,
                }}
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
            return action.hasOwnProperty('method') ? { ...state, sortBy: action.method, orderBy:null} :
                { ...state, orderBy: action.order }
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
        case UPDATE_COMMENT_IN_COMMENTS:
            const {
                id,
                timestamp,
                author,
                body,
                parentId,
                parentDeleted,
                voteScore,
                deleted
            } = action.comment
            console.log(id)
            return {...state,
                [id]: {
                    timestamp,
                    author,
                    body,
                    parentId,
                    parentDeleted,
                    voteScore,
                    deleted
                }}
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