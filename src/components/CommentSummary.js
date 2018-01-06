import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import CommentVote from './CommentVote'
import CommentUpdate from './CommentUpdate'
import { getNewModalKey } from '../utils/Helpers'
import { removeComment, updateModalKey } from '../actions'
import PersonIcon from 'react-icons/lib/md/person'
import TrashIcon from 'react-icons/lib/fa/trash-o'
import PencilIcon from 'react-icons/lib/ti/pencil'
import RightChevronIcon from 'react-icons/lib/md/chevron-right'
class CommentsSummary extends Component {
    static propTypes = {
        id:PropTypes.string.isRequired,
    }
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
    render(){
        const { id } = this.props
        const { body, author } = this.props.comments[id]
        return (
            <div className="comment-summary">
                <div className="comment-author">
                    <PersonIcon size={20} color="grey" />{author}:
                </div>
                <div className="comment-content">
                    <RightChevronIcon size={30} color="grey" /> {body}
                </div>
                <div className="comment-utilities">
                    <CommentVote id={id} />
                    <button className="de-button comment-edit" onClick={this.openModal}>
                        <PencilIcon size={20} color="grey"/>
                    </button>
                    <button className="de-button comment-remove" onClick={()=>(this.props.removeComment(id))}>
                        <TrashIcon size={20} color="grey" />
                    </button>
                </div>
                <Modal
                    className='modal'
                    overlayClassName='modal-overlay'
                    isOpen={this.state.modalKey === this.props.modalKey}
                    onRequestClose={this.closeModal}
                    contentLabel='Modal'
                >
                    <CommentUpdate
                        id={id}
                        author={author}
                        body={body}
                        finishUpdate={this.closeModal}
                    />
                </Modal>
            </div>
        )
    }
}
function mapStateToProps (state) {
    return {
        comments: state.comments,
        modalKey: state.modal.key,
    }
  }
  function mapDispatchToProps (dispatch) {
    return {
        removeComment: (id) => dispatch(removeComment(id)),
        updateModalKey: (key) => dispatch(updateModalKey(key)),
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CommentsSummary)