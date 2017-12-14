import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getComments } from '../actions'
import CommentSummary from './CommentSummary'

class CommentsView extends Component {

    componentDidMount() {
        this.props.getComments(this.props.post.id)
      }

    render(){
        const {comments} = this.props
        return (
            <div>
                <ul>
                {comments.map(({ id, voteScore, body, author, parentId, deleted}) => (
                    <li key={id}>
                        <CommentSummary
                        id={id}
                        voteScore={voteScore}
                        body={body}
                        author={author}
                        parentId={parentId}
                    />
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
      getComments: (id) => dispatch(getComments(id)),
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CommentsView)