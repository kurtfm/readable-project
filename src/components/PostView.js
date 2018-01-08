import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost, getComments } from '../actions'
import CommentsView from './CommentsView'
import PostVote from './PostVote'
import { withRouter } from 'react-router-dom'
import PostCommentAdd from './PostCommentAdd'
import PostRemove from './PostRemove'
import PostEdit from './PostEdit'
import NavigateBackIcon from 'react-icons/lib/md/navigate-before'
import PersonIcon from 'react-icons/lib/md/person'
import TopicFolderIcon from 'react-icons/lib/go/file-submodule'
import ChatBubblesIcon from 'react-icons/lib/fa/comments'

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
                                <PostEdit size={30} />
                            </div>
                            <div className="two columns">
                                <PostRemove id={id} size={30} onRemoveGoBack={true} />
                            </div>
                            <div className="two columns">
                                <PostCommentAdd id={id} />
                            </div>
                            <div className="six columns">
                                <PostVote size={30} />
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
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getPost: (id) => dispatch(getPost(id)),
        getComments: (id) => dispatch(getComments(id)),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
    )(PostView))