import {
    GET_POST,
    CLEAR_POST,
    DECREMENT_COMMENT_COUNT_IN_POST,
    INCREMENT_COMMENT_COUNT_IN_POST,
  } from '../actions'

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
export default post