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
    const filterEnabled = state.hasOwnProperty('filter') && 
        ( state.filter.hasOwnProperty('category') ||
            state.filter.hasOwnProperty('sortBy') )

    const preppedPosts = (posts) => {
        let retArr = posts
        const {filter} = state
        if(filter.hasOwnProperty('category') && filter.category !== null){
            retArr = posts.filter((post) => (post.category === filter.category))
        }
        if(filter.hasOwnProperty('sortBy') && filter.sortBy !== null){
            if(filter.sortBy === 'author'){
                retArr = retArr.sort((a,b) => {
                    const name1 = a.author.toLowerCase().replace(/\s/g,'')
                    const name2 = b.author.toLowerCase().replace(/\s/g,'')
                    if(name1 < name2){
                        return -1
                    }
                    if(name1 > name2){
                        return 1
                    }
                    return 0
                })
            }
            if(filter.sortBy === 'timestamp'){
                retArr = retArr.sort((a,b) => (a.timestamp - b.timestamp))
            }
            if(filter.sortBy === 'title' ){
                retArr = retArr.sort((a,b) => {
                    const title1 = a.title.toLowerCase().replace(/\s/g,'')
                    const title2 = b.title.toLowerCase().replace(/\s/g,'')
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
        posts: filterEnabled ? preppedPosts(entriesArr) : entriesArr,
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