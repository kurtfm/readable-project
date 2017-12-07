import { getAllPosts, getAllCategories } from '../utils/ReadableAPI'

export const GET_POSTS = 'GET_POSTS'
export const UPDATE_POST = 'UPDATE_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const GET_COMMENTS = 'GET_COMMENTS'
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
