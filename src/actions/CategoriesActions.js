import { getAllCategories} from '../utils/ReadableAPI'

export const GET_CATEGORIES = 'GET_CATEGORIES'

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
