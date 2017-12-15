import { getAllPosts, getSinglePost, getAllCategories, getAllComments } from '../utils/ReadableAPI'

export const GET_POSTS = 'GET_POSTS'
export const FILTER_POSTS = 'FILTER_POSTS'
export const CLEAR_FILTER = 'CLEAR_FILTER'
export const SORT_POSTS = 'SORT_POSTS'
export const CLEAR_SORT = 'CLEAR_SORT'
export const CLEAR_POSTS = 'CLEAR_POSTS'
export const GET_POST = 'GET_POST'
export const CLEAR_POST = 'CLEAR_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const GET_COMMENTS = 'GET_COMMENTS'
export const CLEAR_COMMENTS = 'CLEAR_COMMENTS'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const GET_CATEGORIES = 'GET_CATEGORIES'



export function getPosts(){
    return function(dispatch, getState){
        getAllPosts().then((data) => {
            dispatch(updatePosts(data))
          })
    }
}

function updatePosts(posts){
    return {
        type: GET_POSTS,
        posts
    }
}

export function clearPosts(){
    return {
        type: CLEAR_POSTS
    }
}

export function filterPosts(category){
    return {
        type: FILTER_POSTS,
        category,
    }
}

export function clearFilter(){
    return {
        type: CLEAR_FILTER,
    }
}

export function sortPosts(method){
    return {
        type: SORT_POSTS,
        method,
    }
}
export function orderPosts(order){
    return {
        type: SORT_POSTS,
        order,
    }
}
export function clearSort(){
    return {
        type: CLEAR_SORT,
    }
}

export function getPost(id){
    return function(dispatch, getState){
        getSinglePost(id).then((data) => {
            dispatch(updatePost(data))
          })
    }
}

function updatePost(post){
    return {
        type: GET_POST,
        post
    }
}

export function clearPost(){
    return {
        type: CLEAR_POST
    }
}

export function getComments(id){
    return function(dispatch, getState){
        getAllComments(id).then((data) => {
            dispatch(updateComments(data))
          })
    }
}

function updateComments(comments){
    return {
        type: GET_COMMENTS,
        comments,
    }
}

export function clearComments(){
    return {
        type: CLEAR_COMMENTS
    }
}

export function getCategories(){
    return function(dispatch, getState){
        getAllCategories().then((data) => {
            dispatch(updateCategories(data.categories))
          })
    }
}

function updateCategories(categories){
    return {
        type: GET_CATEGORIES,
        categories
    }
}
