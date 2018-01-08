import { getAllPosts,
    getSinglePost,
    putPost,
    postPost,
    deletePost,
    getAllCategories,
    getAllComments,
    putCommentEdit,
    postComment,
    deleteComment,
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
export const REMOVE_POST_IN_POSTS = 'REMOVE_POST_IN_POSTS'
export const UPDATE_POST_IN_POSTS = 'UPDATE_POST_IN_POSTS'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const GET_COMMENTS = 'GET_COMMENTS'
export const CLEAR_COMMENTS = 'CLEAR_COMMENTS'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const DECREMENT_COMMENT_COUNT_IN_POST = 'DECREMENT_COMMENT_COUNT_IN_POST'
export const DECREMENT_COMMENT_COUNT_IN_POSTS = 'DECREMENT_COMMENT_COUNT_IN_POSTS'
export const INCREMENT_COMMENT_COUNT_IN_POST = 'INCREMENT_COMMENT_COUNT_IN_POST'
export const INCREMENT_COMMENT_COUNT_IN_POSTS = 'INCREMENT_COMMENT_COUNT_IN_POSTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const UPDATE_COMMENT_IN_COMMENTS = 'UPDATE_COMMENT_IN_COMMENTS'
export const REMOVE_COMMENT_IN_COMMENTS = 'REMOVE_COMMENT_IN_COMMENTS'
export const UPDATE_MODAL_KEY = 'UPDATE_MODAL_KEY'

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

function decrementCommentCountInPost(id,post){
    return {
        type: DECREMENT_COMMENT_COUNT_IN_POST,
        id,
        post,
    }
}
function decrementCommentCountInPosts(id,posts){
    return {
        type: DECREMENT_COMMENT_COUNT_IN_POSTS,
        id,
        posts,
    }
}
function incrementCommentCountInPost(id,post){
    return {
        type: INCREMENT_COMMENT_COUNT_IN_POST,
        id,
        post,
    }
}
function incrementCommentCountInPosts(id,posts){
    return {
        type: INCREMENT_COMMENT_COUNT_IN_POSTS,
        id,
        posts,
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
function removePostInPosts(post){
    return {
        type: REMOVE_POST_IN_POSTS,
        id: post.id
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
export function editComment(edits){
    return function(dispatch, getState){
        putCommentEdit(edits).then((data) => {
            dispatch( updateCommentInComments(data) )
          })
          .catch()
    }
}
export function addComment(comment){
    return function(dispatch, getState){
        const currentState = getState()
        postComment(comment).then((data) => {
            dispatch( updateCommentInComments(data) )
            dispatch( incrementCommentCountInPost(data.parentId,currentState.post) )
            if(Object.keys(currentState.posts).length < 0){
                dispatch( incrementCommentCountInPosts(data.parentId,currentState.posts) )
            }
          })
          .catch()
    }
}
function updateCommentInComments(comment){
    return {
        type: UPDATE_COMMENT_IN_COMMENTS,
        comment
    }
}
export function removeComment(id){
    return function(dispatch, getState){
        const currentState = getState()
        deleteComment(id).then((data)=> {
            dispatch( removeCommentInComments(data) )
            dispatch( decrementCommentCountInPost(data.parentId,currentState.post) )
            if(Object.keys(currentState.posts).length < 0){
                dispatch( decrementCommentCountInPosts(data.parentId,currentState.posts) )
            }
        })
        .catch()
    }
}

function removeCommentInComments(comment){
    return {
        type: REMOVE_COMMENT_IN_COMMENTS,
        id: comment.id
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
export function updateModalKey(key){
    return {
        type: UPDATE_MODAL_KEY,
        key
    }
}