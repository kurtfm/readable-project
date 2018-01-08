import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PostRemove from './PostRemove'
import PostVote from './PostVote'
import PostEdit from './PostEdit'
import ChatBubblesIcon from 'react-icons/lib/fa/comments'
import PersonIcon from 'react-icons/lib/md/person'

class PostSummary extends Component {
    static propTypes = {
        id:PropTypes.string.isRequired,
    }

    getPostDetailsLink = (id)=>{
        if(this.props.location.pathname === ('/' || '') ){
            return `/post/${id}`
        }
        else{
            return `${this.props.location.pathname}/${id}`
        }
    }

    render(){
        const { id } = this.props
        const { title, author, voteScore, commentCount } = this.props.posts[id]
        return (
            <div className="post-summary constainer">
                <div className="header">
                    <div className="info">
                        <h2 className="title">
                            <Link to={this.getPostDetailsLink(id)}>{title}</Link>
                        </h2>
                        <h4><PersonIcon className="svg-no-hover" size={30} color="grey" /> {author}</h4>
                    </div>
                    <div className="highlights">
                        <span><ChatBubblesIcon className="svg-no-hover" size={20} color="grey"/> {commentCount}</span>
                        <PostVote size={20} summaryScore={voteScore} summaryId={id} />
                    </div>
                </div>
                <div className="utilities">
                    <PostEdit size={20} id={id} />
                    <PostRemove size={20} id={id} />
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        posts: state.posts,
    }
  }

  function mapDispatchToProps (dispatch) {
    return {
    }
  }

  export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostSummary))