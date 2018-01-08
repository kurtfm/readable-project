import {
    GET_CATEGORIES,
  } from '../actions'

function categories(state = {}, action){
    switch(action.type){
        case GET_CATEGORIES:
            let categories = {}
            action.categories.forEach(({ name, path }) => {
                categories[name] = {path,}
            })
            return categories
        default:
            return state
    }
}

export default categories