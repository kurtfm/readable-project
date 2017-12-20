import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import CommentVote from './CommentVote'

class CommentsSummary extends Component {
    static propTypes = {
        id:PropTypes.string.isRequired,
    }

    render(){
        const { id } = this.props
        const { body, author } = this.props.comments[id]
        return (
            <span>
                <div>
                    <hr />
                    {body}<br />
                    by {author}<br />
                    <CommentVote id={id} />
                    <Link to={`/comments/update/${id}`}>update</Link><br />
                    <Link to={`/comments/delete/${id}`}>delete</Link>
                </div>
            </span>
        )
    }
}
function mapStateToProps (state) {
    console.log('CommentsSummary mapStateToProps called')
    return {
        comments: state.comments,
    }
  }
  function mapDispatchToProps (dispatch) {
    return {
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CommentsSummary)