import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts, getCategories } from '../actions'

class PostsView extends Component {
    componentDidMount() {
        this.props.getCategories()
        this.props.getPosts()
      }
    render(){
        const {posts} = this.props
        return (
            <div>
                <ul>
                {posts.map(({ id, timestamp, title, body, author}) => (
                        <li key={id}>{title} by {author}</li>
                ))}
                </ul>
            </div>
        )
    }
}
function mapStateToProps (state) {
    const entries = state.posts
    return {
        posts: Object.keys(entries).map(id => (
            {...entries[id],id}
        )),
        categories: state.categories,
    }
  }

  function mapDispatchToProps (dispatch) {
    return {
      getPosts: () => dispatch(getPosts()),
      getCategories: () => dispatch(getCategories()),
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostsView)