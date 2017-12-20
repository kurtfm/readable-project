import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost, getComments } from '../actions'
import CommentsView from './CommentsView'
import PostVote from './PostVote'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'

class PostView extends Component {

    id() {
        return (this.props.match && this.props.match.params && this.props.match.params.id) || this.props.match.params.id;
    }

    componentDidMount() {
        this.props.getPost(this.id())
        this.props.getComments(this.id())
      }

    render(){
        const {
            id,
            title,
            body,
            author,
            category,
            deleted,
            commentCount
        } = this.props.post
        if(id && !deleted){
            return (
                <div>
                    <Link to="/" >all posts</Link>
                    <h1> {title} </h1>
                    <h2> {author} </h2>
                    <p>{body}</p>
                    <p>{category}</p>
                    <PostVote />
                    <p>comments: {commentCount} </p>
                    <CommentsView />

                    <Modal
        className='modal'
        overlayClassName='overlay'
        contentLabel='Modal'
      >
       <span>modal open</span>
      </Modal>

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
      getComments: (id) => dispatch(getComments(id)),
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostView)