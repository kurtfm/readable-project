import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postUpVote, postDownVote } from '../actions'

class PostVote extends Component {

    render(){
        return(
            <div>
                Vote Score: {this.props.score}
                <button  onClick={() => this.props.upVote(this.props.id)} >Up</button>
                <button  onClick={() => this.props.downVote(this.props.id)} >Down</button>
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