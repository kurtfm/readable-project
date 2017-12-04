import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts, getCategories } from '../actions'

class PostsView extends Component {
    componentDidMount() {
        this.props.getCategories()
        this.props.getPosts()
      }
    render(){
        return (
            <p>GO</p>
        )
    }
}

function mapStateToProps (state) {
    return {
        posts: state.posts,
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