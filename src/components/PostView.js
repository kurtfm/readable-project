import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost, getComments, updateModalKey, removePost } from '../actions'
import CommentsView from './CommentsView'
import PostVote from './PostVote'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import { getNewModalKey } from '../utils/Helpers'
import PostUpdate from './PostUpdate'
import PostCommentAdd from './PostCommentAdd'

class PostView extends Component {
    state = {
        modalKey: '',
      }
      openModal = () => {
        const newModalKey = getNewModalKey()
        this.setState({modalKey: newModalKey})
        this.props.updateModalKey(newModalKey)
      }
      closeModal = () => {
        this.props.updateModalKey(null)
      }

    id() {
        return (this.props.match && this.props.match.params && this.props.match.params.id) || this.props.match.params.id;
    }

    removePost(id){
        this.props.removePost(id)
        this.props.history.goBack()
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
                    <Link to="/" >back to list</Link>
                    <h1> {title} </h1>
                    <h2> by: {author} </h2>
                    <h4>category: {category}</h4>
                    <div style={{whiteSpace: 'pre-wrap'}}>{body}</div>
                    <button onClick={this.openModal}>Update</button>
                    <Modal
                        className='modal'
                        overlayClassName='modal-overlay'
                        isOpen={this.state.modalKey === this.props.modalKey}
                        onRequestClose={this.closeModal}
                        contentLabel='Modal'
                    >
                        <PostUpdate finishUpdate={this.closeModal} />
                    </Modal>
                    <button onClick={()=>this.removePost(id)}>Delete</button>
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
        post: state.post,
        modalKey: state.modal.key,
    }
  }

  function mapDispatchToProps (dispatch) {
    return {
      getPost: (id) => dispatch(getPost(id)),
      getComments: (id) => dispatch(getComments(id)),
      updateModalKey: (key) => dispatch(updateModalKey(key)),
      removePost: (id) => dispatch(removePost(id)),
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostView)