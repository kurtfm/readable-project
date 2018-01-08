import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost, getComments, updateModalKey, removePost } from '../actions'
import CommentsView from './CommentsView'
import PostVote from './PostVote'
import Modal from 'react-modal'
import { withRouter } from 'react-router-dom'
import { getNewModalKey } from '../utils/Helpers'
import PostUpdate from './PostUpdate'
import PostCommentAdd from './PostCommentAdd'
import NavigateBackIcon from 'react-icons/lib/md/navigate-before'
import PersonIcon from 'react-icons/lib/md/person'
import TopicFolderIcon from 'react-icons/lib/go/file-submodule'
import TrashIcon from 'react-icons/lib/fa/trash-o'
import PencilIcon from 'react-icons/lib/ti/pencil'
import ChatBubblesIcon from 'react-icons/lib/fa/comments'

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

        const commentCountPlural = commentCount === 1 ? '' : 's'

        if(id && !deleted){
            return (
                <div className="post-page">
                    <header>
                        <button className="go-back de-button" onClick={()=>(this.props.history.goBack())} to="/" >
                            <NavigateBackIcon size={40} color="grey" />
                            Back
                        </button>
                    </header>
                    <section className="post-view container">
                        <div className="row">
                            <div className="twelve columns">
                                <div className="title">
                                    <h1> {title} </h1>
                                </div>
                                <div className="meta">
                                    <h4><PersonIcon className="svg-no-hover" size={30} color="grey" /> {author} </h4>
                                    <h4><TopicFolderIcon className="svg-no-hover" size={25} color="grey" /> {category}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="twelve columns">
                                <div className="post-content">{body}</div>
                            </div>
                        </div>
                        <div className="row post-actions">
                            <div className="two columns">
                                <button className="de-button" onClick={this.openModal}>
                                    <PencilIcon size={30} color="grey" /> Edit
                                </button>
                            </div>
                            <div className="two columns">
                                <button className="de-button" onClick={()=>this.removePost(id)}>
                                    <TrashIcon size={30} color="grey" /> Remove
                                </button>
                            </div>
                            <div className="two columns">
                                <PostCommentAdd id={id} />
                            </div>
                            <div className="six columns">
                                <PostVote />
                            </div>
                        </div>
                    </section>
                    <section className="comments-view container">
                        <div className="row">
                            <div className="twelve columns">
                                <div className="comments-count">
                                   <ChatBubblesIcon className="svg-no-hover" size={40} color="grey"/> {`${commentCount} comment${commentCountPlural}`}
                                </div>
                            </div>
                        </div>
                        <CommentsView />
                    </section>
                    <Modal
                        className='modal'
                        overlayClassName='modal-overlay'
                        isOpen={this.state.modalKey === this.props.modalKey}
                        onRequestClose={this.closeModal}
                        contentLabel='Modal'
                    >
                        <PostUpdate finishUpdate={this.closeModal} />
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

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
    )(PostView))