import { getAllPosts, getAllCategories } from '../utils/ReadableAPI'

export const UPDATE_POSTS = 'UPDATE_POSTS'
export const UPDATE_POST = 'UPDATE_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const UPDATE_COMMENTS = 'UPDATE_COMMENTS'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES'



export function getPosts(){
    return function(dispatch, getState){
        getAllPosts().then((data) => {
            console.log(data)
            dispatch(updatePosts(data))
          })
    }
}

function updatePosts(posts){
    return {
        type: UPDATE_POSTS,
        posts
    }
}
export function getCategories(){
    return function(dispatch, getState){
        getAllCategories().then((data) => {
            dispatch(updateCategories(data))
          })
    }
}

function updateCategories(categories){
    return {
        type: UPDATE_CATEGORIES,
        categories
    }
}
