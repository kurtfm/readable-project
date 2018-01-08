import {
    FILTER_POSTS,
    CLEAR_FILTER,
    SORT_POSTS,
    CLEAR_SORT,
  } from '../actions'

function filter(state={}, action){
    switch(action.type){
        case FILTER_POSTS:
            return { ...state, category: action.category }
        case CLEAR_FILTER:
            return {...state,category:null}
        case SORT_POSTS:
            return action.hasOwnProperty('method') ? { ...state, sortBy: action.method, orderBy:null} :
                { ...state, orderBy: action.order }
        case CLEAR_SORT:
            return {...state,sortBy:null,orderBy:null}
        default:
            return state
    }
}

export default filter