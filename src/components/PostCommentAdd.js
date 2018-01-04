import React, { Component } from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getNewModalKey } from '../utils/Helpers'
import { updateModalKey } from '../actions'
import CommentAdd from './CommentAdd'

class PostCommentAdd extends Component {
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
        return (
            <div>
                <button onClick={this.openModal}>New Comment</button>
                <Modal
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={this.state.modalKey === this.props.modalKey}
                    onRequestClose={this.closeModal}
                    contentLabel='Modal'
                >
                    <CommentAdd parentId={this.props.id} finishUpdate={this.closeModal} />
                </Modal>
            </div>
        )

    }
}

function mapStateToProps (state) {
    return {
        modalKey: state.modal.key,
    }
  }
  function mapDispatchToProps (dispatch) {
    return {
        updateModalKey: (key) => dispatch(updateModalKey(key)),
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostCommentAdd)