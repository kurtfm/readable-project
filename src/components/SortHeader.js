import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sortPosts, orderPosts, clearSort } from '../actions'

class SortHeader extends Component {

    render(){
        return (
            <ul>
                {['time','author','title'].map((method,index) => (
                    <li key={index}><button onClick={() => this.props.sortPosts(method)}>{method}</button></li>
                ))}
                {this.props.filter.sortBy && (
                    <ul>
                        {['ascending','descending'].map((order,index) => (
                            <li key={index}><button onClick={() => this.props.orderPosts(order)}>{order}</button></li>
                        ))}
                    </ul>
                )}
                <li><button onClick={() => this.props.clearSort()}>Clear Sorting</button></li>
            </ul>
        )
    }
}
function mapStateToProps (state) {
    return {
        filter: state.filter
    }
  }
  function mapDispatchToProps (dispatch) {
    return {
      sortPosts: (method) => dispatch(sortPosts(method)),
      orderPosts: (order) => dispatch(orderPosts(order)),
      clearSort: () => dispatch(clearSort()),
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SortHeader)