import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost } from '../actions'
import CommentsView from './CommentsView'

class PostView extends Component {

    id() {
        return (this.props.match && this.props.match.params && this.props.match.params.id) || this.props.match.params.id;
    }

    componentDidMount() {
        this.props.getPost(this.id())
      }

    render(){
        const {
            id,
            timestamp,
            title,
            body,
            author,
            category,
            voteScore,
            deleted,
            commentCount
        } = this.props.post
        if(id){
            return (
                <div>
                    <h1> {title} </h1>
                    <h2> {author} </h2>
                    <p>{body}</p>
                    <p>votes: {voteScore} </p>
                    <p>comments: {commentCount} </p>
                    <CommentsView />
                </div>
            )
        }
        else{
            return (
                <div>POST NOT FOUND</div>
            )
        }

    }
}
function mapStateToProps (state) {
    return {
        post: state.post
    }
  }

  function mapDispatchToProps (dispatch) {
    return {
      getPost: (id) => dispatch(getPost(id)),
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostView)