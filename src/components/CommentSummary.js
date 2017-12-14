import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class CommentsSummary extends Component {
    static propTypes = {
        body:PropTypes.string.isRequired,
        author:PropTypes.string.isRequired,
        id:PropTypes.string.isRequired,
        voteScore:PropTypes.number.isRequired
    }

    render(){
        const { body, author, voteScore, id } = this.props
        return (
            <span>
                <div>
                    <hr />
                    {body}<br />
                    by {author}<br />
                    vote score: {voteScore}<br />
                    <Link to={`/comments/update/${id}`}>update</Link><br />
                    <Link to={`/post/${id}`}>delete</Link>
                </div>
            </span>
        )
    }

}
export default CommentsSummary