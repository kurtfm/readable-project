export const FILTER_POSTS = 'FILTER_POSTS'
export const CLEAR_FILTER = 'CLEAR_FILTER'
export const SORT_POSTS = 'SORT_POSTS'
export const CLEAR_SORT = 'CLEAR_SORT'

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