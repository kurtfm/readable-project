import {
    UPDATE_MODAL_KEY,
  } from '../actions'

function modal(state = {}, action){
    switch(action.type){
        case UPDATE_MODAL_KEY:
            return {key:action.key}
        default:
            return state
    }
}
export default modal