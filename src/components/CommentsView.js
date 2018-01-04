import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentSummary from './CommentSummary'

class CommentsView extends Component {

    render(){
        const {comments} = this.props
        return (
            <div>
                <ul>
                {comments.map(({ id }) => (
                    <li key={id}>
                        <CommentSummary id={id} />
                    </li>
                ))}
                </ul>
            </div>
        )
    }
}
function mapStateToProps (state) {
    const entries = state.comments
    return {
        comments: Object.keys(entries)[0] ? Object.keys(entries).map(id => {
            if(entries[id].deleted === false){
                return {...entries[id],id}
            }
            else{
                return null
            }
        }) : [],
        post: state.post
    }
  }

  function mapDispatchToProps (dispatch) {
    return {
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CommentsView)