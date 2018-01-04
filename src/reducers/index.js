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
    REMOVE_COMMENT_IN_COMMENTS,
    DECREMENT_COMMENT_COUNT_IN_POST,
    INCREMENT_COMMENT_COUNT_IN_POST,
    DECREMENT_COMMENT_COUNT_IN_POSTS,
    INCREMENT_COMMENT_COUNT_IN_POSTS,
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
        case DECREMENT_COMMENT_COUNT_IN_POSTS:
            let postsForDecrement = Object.assign({},action.posts)
            postsForDecrement[action.id].commentCount--
            return postsForDecrement
        case INCREMENT_COMMENT_COUNT_IN_POSTS:
            let postsForIncrement = Object.assign({},action.posts)
            postsForIncrement[action.id].commentCount++
            return postsForIncrement
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
        case DECREMENT_COMMENT_COUNT_IN_POST:
            let postForDecrement = Object.assign({},action.post)
            postForDecrement.commentCount--
            return postForDecrement
        case INCREMENT_COMMENT_COUNT_IN_POST:
            let postForIncrement = Object.assign({},action.post)
            postForIncrement.commentCount++
            return postForIncrement
        case CLEAR_POST:
            return {}
        default:
            return state
    }
}

function comments(state={}, action){
    switch(action.type){
        case GET_COMMENTS:
            let getComments = {}
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
                    getComments[id] = {
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
            return getComments
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
        case REMOVE_COMMENT_IN_COMMENTS:
        console.log('remove comment in comments called with',action)
            let removeComment = {}
            Object.assign(removeComment,state)
            delete removeComment[action.id]
            return removeComment
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