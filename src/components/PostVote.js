import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { postUpVote, postDownVote } from '../actions'
import ThumbsUp from 'react-icons/lib/fa/thumbs-o-up'
import ThumbsDown from 'react-icons/lib/fa/thumbs-o-down'

class PostVote extends Component {

    static propTypes = {
        size:PropTypes.number.isRequired,
        summaryScore:PropTypes.number,
        summaryId:PropTypes.string,
    }

    render(){
        const id = this.props.id || this.props.summaryId
        const score = this.props.score || this.props.summaryScore
        return(
            <div className="post-vote vote">
                <button  className="de-button" onClick={() => this.props.upVote(id)} >
                    <ThumbsUp size={this.props.size} color="grey" className="svg-flip" />
                </button>
                <div className="score">
                    {score}
                </div>
                <button className="de-button" onClick={() => this.props.downVote(id)} >
                    <ThumbsDown size={this.props.size} color="grey" />
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