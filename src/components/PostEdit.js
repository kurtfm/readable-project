import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import PostUpdate from './PostUpdate'
import PencilIcon from 'react-icons/lib/ti/pencil'
import { updateModalKey } from '../actions'
import { getNewModalKey } from '../utils/Helpers'

class PostEdit extends Component {

    static propTypes = {
        id:PropTypes.string,
        size:PropTypes.number.isRequired,
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
            <span>
                <button className="de-button" onClick={this.openModal}>
                    <PencilIcon size={this.props.size} color="grey" /> Edit
                </button>
                <Modal
                    className='modal'
                    overlayClassName='modal-overlay'
                    isOpen={this.state.modalKey === this.props.modalKey}
                    onRequestClose={this.closeModal}
                    contentLabel='Modal'
                >
                    <PostUpdate finishUpdate={this.closeModal} summaryId={this.props.id}/>
                </Modal>
            </span>
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
        updateModalKey: (key) => dispatch(updateModalKey(key))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(PostEdit)