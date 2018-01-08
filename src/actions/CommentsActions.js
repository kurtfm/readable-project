import { getAllComments,
    putCommentEdit,
    postComment,
    deleteComment,
    incrementCommentVote,
    decrementCommentVote} from '../utils/ReadableAPI'

export const GET_COMMENTS = 'GET_COMMENTS'
export const CLEAR_COMMENTS = 'CLEAR_COMMENTS'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const UPDATE_COMMENT_IN_COMMENTS = 'UPDATE_COMMENT_IN_COMMENTS'
export const REMOVE_COMMENT_IN_COMMENTS = 'REMOVE_COMMENT_IN_COMMENTS'
export const DECREMENT_COMMENT_COUNT_IN_POSTS = 'DECREMENT_COMMENT_COUNT_IN_POSTS'
export const INCREMENT_COMMENT_COUNT_IN_POSTS = 'INCREMENT_COMMENT_COUNT_IN_POSTS'
export const DECREMENT_COMMENT_COUNT_IN_POST = 'DECREMENT_COMMENT_COUNT_IN_POST'
export const INCREMENT_COMMENT_COUNT_IN_POST = 'INCREMENT_COMMENT_COUNT_IN_POST'

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

export function decrementCommentCountInPosts(id,posts){
    return {
        type: DECREMENT_COMMENT_COUNT_IN_POSTS,
        id,
        posts,
    }
}

export function incrementCommentCountInPosts(id,posts){
    return {
        type: INCREMENT_COMMENT_COUNT_IN_POSTS,
        id,
        posts,
    }
}
export function decrementCommentCountInPost(id,post){
    return {
        type: DECREMENT_COMMENT_COUNT_IN_POST,
        id,
        post,
    }
}
export function incrementCommentCountInPost(id,post){
    return {
        type: INCREMENT_COMMENT_COUNT_IN_POST,
        id,
        post,
    }
}
