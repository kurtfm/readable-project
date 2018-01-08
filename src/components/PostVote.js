import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postUpVote, postDownVote } from '../actions'
import ThumbsUp from 'react-icons/lib/fa/thumbs-o-up'
import ThumbsDown from 'react-icons/lib/fa/thumbs-o-down'

class PostVote extends Component {
    render(){
        return(
            <div className="post-vote vote">
                <button  className="de-button" onClick={() => this.props.upVote(this.props.id)} >
                    <ThumbsUp size={30} color="grey" className="svg-flip" />
                </button>
                <div className="score">
                    {this.props.score}
                </div>
                <button className="de-button" onClick={() => this.props.downVote(this.props.id)} >
                    <ThumbsDown size={30} color="grey" />
                </button>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        score: state.post.voteScore,
        id: state.post.id,
    }
  }

  function mapDispatchToProps (dispatch) {
    return {
      upVote: (id) => dispatch(postUpVote(id)),
      downVote: (id) => dispatch(postDownVote(id)),
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostVote)