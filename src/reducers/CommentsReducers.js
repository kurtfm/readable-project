import {
    GET_COMMENTS,
    CLEAR_COMMENTS,
    UPDATE_COMMENT_IN_COMMENTS,
    REMOVE_COMMENT_IN_COMMENTS,
  } from '../actions'

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

export default comments