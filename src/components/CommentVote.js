import React, { Component } from 'react'
import { connect } from 'react-redux'
import { commentUpVote, commentDownVote } from '../actions'
import PropTypes from 'prop-types'
import ThumbsUp from 'react-icons/lib/fa/thumbs-o-up'
import ThumbsDown from 'react-icons/lib/fa/thumbs-o-down'

class CommentVote extends Component {
    static propTypes = {
        id:PropTypes.string.isRequired,
    }
    render(){
        const id = this.props.id
        return(
            <div className="comment-vote vote">
                <button  className="de-button" onClick={() => this.props.upVote(id)} >
                    <ThumbsUp size={20} color="grey" className="svg-flip" />
                </button>
                <div className="score">
                    {this.props.comments[id].voteScore}
                </div>
                <button className="de-button" onClick={() => this.props.downVote(id)} >
                    <ThumbsDown size={20} color="grey" />
                </button>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        comments: state.comments,
    }
  }

  function mapDispatchToProps (dispatch) {
    return {
      upVote: (id) => dispatch(commentUpVote(id)),
      downVote: (id) => dispatch(commentDownVote(id)),
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CommentVote)