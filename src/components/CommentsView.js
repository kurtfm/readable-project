import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentSummary from './CommentSummary'
import { sortByComparison } from '../utils/Helpers'

class CommentsView extends Component {

    render(){
        const {comments} = this.props
        return (
            <section>
                {comments.map(({ id }) => (
                    <div className="row" key={id}>
                        <div className="six columns">
                            <CommentSummary id={id} />
                        </div>
                        <div className="six columns"></div>
                    </div>
                ))}
            </section>
        )
    }
}
function mapStateToProps (state) {
    const entries = state.comments
    const entriesArr = Object.keys(entries)[0] ? Object.keys(entries).map(id => {
        if(entries[id].deleted === false){
            return {...entries[id],id}
        }
        else{
            return null
        }
    }) : []
    const sortedComments = (comments)=> {
        return sortByComparison(comments,'voteScore',true)
    }

    return {
        comments: sortedComments(entriesArr),
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