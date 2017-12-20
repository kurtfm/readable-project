import React, { Component } from 'react'
import { connect } from 'react-redux'
import { commentUpVote, commentDownVote } from '../actions'
import PropTypes from 'prop-types'

class CommentVote extends Component {
    static propTypes = {
        id:PropTypes.string.isRequired,
    }
    render(){
        const id = this.props.id
        return(
            <div>
                Vote Score: {this.props.comments[id].voteScore}
                <button  onClick={() => this.props.upVote(id)} >Up</button>
                <button  onClick={() => this.props.downVote(id)} >Down</button>
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