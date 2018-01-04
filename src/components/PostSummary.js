import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class PostSummary extends Component {
    static propTypes = {
        id:PropTypes.string.isRequired,
    }

    render(){
        const { id } = this.props
        const { title, author, voteScore, commentCount } = this.props.posts[id]
        return (
            <div>
            {title}<br />
            by {author}<br />
            comments: {commentCount}<br />
            vote score: {voteScore}<br />
            <Link to={`${this.props.location.pathname}/${id}`}>details</Link>
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