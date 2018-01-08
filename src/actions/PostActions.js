import { getSinglePost,
    putPost,
    postPost,
    deletePost,
    incrementPostVote,
    decrementPostVote} from '../utils/ReadableAPI'

export const GET_POST = 'GET_POST'
export const CLEAR_POST = 'CLEAR_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const REMOVE_POST_IN_POSTS = 'REMOVE_POST_IN_POSTS'
export const UPDATE_POST_IN_POSTS = 'UPDATE_POST_IN_POSTS'

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

function updatePostInPosts(post){
    return {
        type: UPDATE_POST_IN_POSTS,
        post
    }
}

function removePostInPosts(post){
    return {
        type: REMOVE_POST_IN_POSTS,
        id: post.id
    }
}

export function clearPost(){
    return {
        type: CLEAR_POST
    }
}

export function editPost(edits){
    return function(dispatch, getState){
        putPost(edits).then((data) => {
            dispatch( updatePost(data) )
            dispatch( updatePostInPosts(data) )
          })
          .catch()
    }
}

export function addPost(post){
    return function(dispatch, getState){
        postPost(post).then((data) => {
            dispatch( updatePostInPosts(data) )
          })
          .catch()
    }
}

export function removePost(id){
    return function(dispatch, getState){
        deletePost(id).then((data)=> {
            dispatch( removePostInPosts(data) )
        })
        .catch()
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