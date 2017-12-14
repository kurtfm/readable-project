import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class PostSummary extends Component {
    static propTypes = {
        title:PropTypes.string.isRequired,
        author:PropTypes.string.isRequired,
        id:PropTypes.string.isRequired,
        voteScore:PropTypes.number.isRequired,
        commentCount: PropTypes.number.isRequired,
    }

    render(){
        const { title, author, voteScore, commentCount, id } = this.props
        return (
            <div>
            {title}<br />
            by {author}<br />
            comments: {commentCount}<br />
            vote score: {voteScore}<br />
            <Link to={`/post/${id}`}>details</Link>
            </div>
        )
    }
}
export default PostSummary