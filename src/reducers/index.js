import { combineReducers } from 'redux'
import posts from './PostsReducers';
import post from './PostReducers';
import comments from './CommentsReducers'
import filter from './FilterReducers'
import categories from './CategoriesReducers'
import modal from './ModalReducers'

export default combineReducers({
    posts,
    filter,
    post,
    categories,
    comments,
    modal,
})