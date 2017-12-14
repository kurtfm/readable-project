import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sortPosts } from '../actions'

class SortHeader extends Component {

    render(){
        return (
            <ul>
                {['time','author','title'].map((method,index) => (
                    <li key={index}><button onClick={() => this.props.sortPosts(method)}>{method}</button></li>
                ))}
            </ul>
        )
    }
}
function mapStateToProps (state) {
    return {
    }
  }
  function mapDispatchToProps (dispatch) {
    return {
      sortPosts: (method) => dispatch(sortPosts(method)),
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SortHeader)