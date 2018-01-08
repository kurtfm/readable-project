import {
    GET_POSTS,
    CLEAR_POSTS,
    REMOVE_POST_IN_POSTS,
    UPDATE_POST_IN_POSTS,
    DECREMENT_COMMENT_COUNT_IN_POSTS,
    INCREMENT_COMMENT_COUNT_IN_POSTS,
  } from '../actions'

function posts(state = {}, action){
    switch(action.type){
        case GET_POSTS:
            let posts = {}
            action.posts.forEach(({
                  id,
                  timestamp,
                  title,
                  author,
                  body,
                  category,
                  voteScore,
                  deleted,
                  commentCount
                }) =>{
                    posts[id] = {
                        timestamp,
                        title,
                        author,
                        body,
                        category,
                        voteScore,
                        deleted,
                        commentCount,
                    }
                }
            )
            return posts
        case CLEAR_POSTS:
            return {}
        case UPDATE_POST_IN_POSTS:
            const {
                id,
                timestamp,
                title,
                author,
                body,
                category,
                voteScore,
                deleted,
                commentCount,
            } = action.post
            return {...state,
                [id]: {
                    timestamp,
                    title,
                    author,
                    body,
                    category,
                    voteScore,
                    deleted,
                    commentCount,
                }}
        case DECREMENT_COMMENT_COUNT_IN_POSTS:
            let postsForDecrement = Object.assign({},action.posts)
            postsForDecrement[action.id].commentCount--
            return postsForDecrement
        case INCREMENT_COMMENT_COUNT_IN_POSTS:
            let postsForIncrement = Object.assign({},action.posts)
            postsForIncrement[action.id].commentCount++
            return postsForIncrement
        case REMOVE_POST_IN_POSTS:
            let removePost = {}
            Object.assign(removePost,state)
            delete removePost[action.id]
            return removePost
        default:
            return state
    }
}

export default posts