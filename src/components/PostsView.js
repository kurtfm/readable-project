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

                </ul>
            </div>
        )
    }
}
                    //{posts.map(({ id, timestamp, title, body, author}) => (
                        //<li key={id}>{title} by {author}</li>
                    //))}
function mapStateToProps ({ posts, categories }) {

console.log(Object.keys(posts))
    return {
        posts: posts,
        categories: categories,
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