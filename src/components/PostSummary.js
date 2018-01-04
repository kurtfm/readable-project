import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class PostSummary extends Component {
    static propTypes = {
        id:PropTypes.string.isRequired,
    }

    getPostDetailsLink = (id)=>{
        if(this.props.location.pathname === ('/' || '') ){
            return `/post/${id}`
        }
        else{
            return `${this.props.location.pathname}/${id}`
        }
    }

    render(){
        const { id } = this.props
        const { title, author, voteScore, commentCount } = this.props.posts[id]
        return (
            <div>
            <h2>{title}</h2>
            <h4>by: {author}</h4>
            comments: {commentCount}<br />
            vote score: {voteScore}<br />
            <Link to={this.getPostDetailsLink(id)}>View Post</Link>
            </div>
        )
    }
}
function mapStateToProps (state) {
    return {
        posts: state.posts,
    }
  }
  function mapDispatchToProps (dispatch) {
    return {
    }
  }

  export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostSummary))