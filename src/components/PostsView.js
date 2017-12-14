import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts, getCategories, clearPost, clearComments } from '../actions'
import PostSummary from './PostSummary'
import CategoriesHeader from './CategoriesHeader'
import SortHeader from './SortHeader';

class PostsView extends Component {

    componentDidMount() {
        this.props.getPosts()
        this.props.clearPost()
        this.props.clearComments()
    }

    render(){

        return (
            <div>
                <SortHeader />
                <CategoriesHeader />
                <ul>
                {this.props.posts.map(({ id, title, body, author,commentCount,voteScore, deleted}) => (
                    <li key={id}>
                        <PostSummary
                            id={id}
                            title={title}
                            body={body}
                            author={author}
                            commentCount={commentCount}
                            voteScore={voteScore}
                            deleted={deleted}
                            />
                    </li>
                ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps (state) {
    const entries = state.posts
    const entriesArr = Object.keys(entries)[0] ? Object.keys(entries).map(id => {
        if(entries[id].deleted === false){
            return {...entries[id],id}
        }
        else{
            return null
        }
    }) : []

    const preppedPosts = (posts) => {
        let retArr = posts
        const {category,sortBy} = state.filter
        if(category){
            retArr = posts.filter((post) => (post.category === state.filter.category))
        }
        if(sortBy){
            if(sortBy === 'author'){
                retArr = retArr.sort((a,b) => {
                    const name1 = a.author.toLowerCase
                    const name2 = b.author.toLowerCase
                    if(name1 < name2){
                        return -1
                    }
                    if(name1 > name2){
                        return 1
                    }
                    return 0
                })
            }
            if(sortBy === 'timestamp'){
                retArr = retArr.sort((a,b) => (a.timestamp - b.timestamp))
            }
            if(sortBy === 'title' ){
                retArr = retArr.sort((a,b) => {
                    const title1 = a.title.toLowerCase
                    const title2 = b.title.toLowerCase
                    if(title1 < title2){
                        return -1
                    }
                    if(title1 > title2){
                        return 1
                    }
                    return 0
                })
            }
        }

        return retArr
    }

    return {
        posts: preppedPosts(entriesArr)
    }
  }

  function mapDispatchToProps (dispatch) {
    return {
      getPosts: () => dispatch(getPosts()),
      clearPost: () => dispatch(clearPost()),
      clearComments: () => dispatch(clearComments()),
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostsView)