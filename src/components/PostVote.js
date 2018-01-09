import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { postUpVote, postDownVote } from '../actions'
import ThumbsUp from 'react-icons/lib/fa/thumbs-o-up'
import ThumbsDown from 'react-icons/lib/fa/thumbs-o-down'

class PostVote extends Component {

    static propTypes = {
        size:PropTypes.number.isRequired,
        score:PropTypes.number,
        id:PropTypes.string,
    }

    render(){
        const id = this.props.id
        console.log(id)
        const score = this.props.score
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
    return {}
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