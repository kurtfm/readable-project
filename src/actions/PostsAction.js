import { getAllPosts} from '../utils/ReadableAPI'

export const GET_POSTS = 'GET_POSTS'
export const CLEAR_POSTS = 'CLEAR_POSTS'

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

