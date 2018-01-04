import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import CommentVote from './CommentVote'
import CommentUpdate from './CommentUpdate'
import { removeComment } from '../actions'

class CommentsSummary extends Component {
    static propTypes = {
        id:PropTypes.string.isRequired,
    }
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
    render(){
        const { id } = this.props
        const { body, author } = this.props.comments[id]
        const { updateModalOpen } = this.state
        return (
            <span>
                <div>
                    <hr />
                    {body}<br />
                    by {author}<br />
                    <CommentVote id={id} />
                    <button onClick={this.openUpdateModal}>Update</button>
                    <Modal
                        className='modal'
                        overlayClassName='overlay'
                        isOpen={updateModalOpen}
                        onRequestClose={this.closeUpdateModal}
                        contentLabel='Modal'
                    >
                        <CommentUpdate
                            id={id}
                            author={author}
                            body={body}
                            finishUpdate={this.closeUpdateModal}
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
    }
  }
  function mapDispatchToProps (dispatch) {
    return {
        removeComment: (id) => dispatch(removeComment(id)),
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CommentsSummary)