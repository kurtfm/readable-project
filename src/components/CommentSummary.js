import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import CommentVote from './CommentVote'
import CommentUpdate from './CommentUpdate'
import { getNewModalKey } from '../utils/Helpers'
import { removeComment, updateModalKey } from '../actions'

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
            <span>
                <div>
                    <hr />
                    {body}<br />
                    by {author}<br />
                    <CommentVote id={id} />
                    <button onClick={this.openModal}>Update</button>
                    <Modal
                        className='modal'
                        overlayClassName='overlay'
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
                    <button onClick={()=>(this.props.removeComment(id))}>delete</button>
                </div>
            </span>
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