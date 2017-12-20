import { getAllPosts,
    getSinglePost,
    getAllCategories,
    getAllComments,
    incrementPostVote,
    decrementPostVote,
    incrementCommentVote,
    decrementCommentVote} from '../utils/ReadableAPI'

export const GET_POSTS = 'GET_POSTS'
export const FILTER_POSTS = 'FILTER_POSTS'
export const CLEAR_FILTER = 'CLEAR_FILTER'
export const SORT_POSTS = 'SORT_POSTS'
export const CLEAR_SORT = 'CLEAR_SORT'
export const CLEAR_POSTS = 'CLEAR_POSTS'
export const GET_POST = 'GET_POST'
export const CLEAR_POST = 'CLEAR_POST'
export const UPDATE_POST_IN_POSTS = 'UPDATE_POST_IN_POSTS'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const GET_COMMENTS = 'GET_COMMENTS'
export const CLEAR_COMMENTS = 'CLEAR_COMMENTS'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const UPDATE_COMMENT_IN_COMMENTS = 'UPDATE_COMMENT_IN_COMMENTS'



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

function updatePostInPosts(post){
    return {
        type: UPDATE_POST_IN_POSTS,
        post
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
            dispatch( updatePost(data) )
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
            dispatch( updateComments(data) )
          })
    }
}

function updateComments(comments){
    return {
        type: GET_COMMENTS,
        comments,
    }
}

function updateCommentInComments(comment){
    return {
        type: UPDATE_COMMENT_IN_COMMENTS,
        comment
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
            dispatch( updateCategories(data.categories) )
          })
    }
}

function updateCategories(categories){
    return {
        type: GET_CATEGORIES,
        categories
    }
}

export function postUpVote(id){
    return function(dispatch, getState){
        incrementPostVote(id).then((data) => {
            dispatch( updatePost(data) )
            dispatch( updatePostInPosts(data) )
        })
    }
}
export function postDownVote(id){
    return function(dispatch, getState){
        decrementPostVote(id).then((data) => {
            dispatch(updatePost(data))
            dispatch(updatePostInPosts(data))
        })
    }
}

export function commentUpVote(id){
    return function(dispatch, getState){
        incrementCommentVote(id).then((data) => {
            dispatch(updateCommentInComments(data))
        })
    }
}
export function commentDownVote(id){
    return function(dispatch, getState){
        decrementCommentVote(id).then((data) => {
            dispatch(updateCommentInComments(data))
        })
    }
}