import React, { Component } from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import CommentAdd from './CommentAdd'

class PostCommentAdd extends Component {
    static propTypes = {
        id:PropTypes.string.isRequired,
    }
    state = {
        commentModalOpen: false,
      }
      openCommentModal = ({ meal, day }) => {
        this.setState(() => ({
          commentModalOpen: true,
        }))
      }
      closeCommentModal = () => {
        this.setState(() => ({
          commentModalOpen: false,
        }))
      }

    render(){
        const { commentModalOpen } = this.state
        return (
            <div>
                <button onClick={this.openCommentModal}>New Comment</button>
                <Modal
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={commentModalOpen}
                    onRequestClose={this.closeCommentModal}
                    contentLabel='Modal'
                >
                    <CommentAdd parentId={this.props.id} finishUpdate={this.closeCommentModal} />
                </Modal>
            </div>
        )

    }
}

export default PostCommentAdd