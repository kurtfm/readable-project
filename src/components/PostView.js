import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost, getComments } from '../actions'
import CommentsView from './CommentsView'
import PostVote from './PostVote'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import PostUpdate from './PostUpdate'
import PostCommentAdd from './PostCommentAdd'

class PostView extends Component {
    state = {
        updateModalOpen: false,
      }
      openUpdateModal = ({ meal, day }) => {
        this.setState(() => ({
          updateModalOpen: true,
        }))
      }
      closeUpdateModal = () => {
        this.setState(() => ({
          updateModalOpen: false,
        }))
      }

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
        const { updateModalOpen } = this.state
        if(id && !deleted){
            return (
                <div>
                    <Link to="/" >all posts</Link>
                    <h1> {title} </h1>
                    <h2> {author} </h2>
                    <p>{body}</p>
                    <p>{category}</p>
                    <button onClick={this.openUpdateModal}>Update</button>
                    <Modal
                        className='modal'
                        overlayClassName='overlay'
                        isOpen={updateModalOpen}
                        onRequestClose={this.closeUpdateModal}
                        contentLabel='Modal'
                    >
                        <PostUpdate finishUpdate={this.closeUpdateModal} />
                    </Modal>
                    <PostVote />
                    <PostCommentAdd id={id} />
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
      getComments: (id) => dispatch(getComments(id)),
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostView)