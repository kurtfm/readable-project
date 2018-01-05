import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import randomColor from 'randomcolor'
import ChatBubble from 'react-icons/lib/md/chat-bubble-outline'
import ThumbsUpDown from 'react-icons/lib/md/thumbs-up-down'
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
            <div className="post-summary">
                <div>
                    <h2 className="post-title">
                        <Link to={this.getPostDetailsLink(id)}>{title}</Link>
                    </h2>
                    <h4 className="post-meta">by: {author}</h4>
                </div>
                <div className="scores">
                    <ChatBubble size={20} /> {commentCount}<br />
                    <ThumbsUpDown size={20} /> {voteScore}<br />
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