import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sortPosts, orderPosts, clearSort } from '../actions'

class SortHeader extends Component {

    state = {
        sortBy: this.sortByHasBeenSet ? this.props.filter.sortBy : '',
    }

    sortByHasBeenSet(){
        return this.props.filter.hasOwnProperty('sortBy') &&
            this.props.filter.sortBy !== null
    }

    handleSortChange(event){
        this.setState({sortBy:event.target.value})
        this.props.sortPosts(event.target.value) 
    }
    handleSortClear(){
        this.setState({sortBy:''})
        this.props.clearSort()
    }

    render(){
        return (
            <div>
                <select value={this.state.sortBy} onChange={(event) => this.handleSortChange(event)}>
                    <option value="">Sort By:</option>
                    {['time','author','title','votes'].map((method,index) => (
                        <option key={index} value={method}>{method}</option>
                    ))}
                </select>
                { this.sortByHasBeenSet() && (
                    <div>
                        <select onChange={(event) => this.props.orderPosts(event.target.value)}>
                            {['ascending','descending'].map((order,index) => (
                                <option key={index} value={order}>{order}</option>
                            ))}
                        </select>
                        <button onClick={() => this.handleSortClear()} >Clear Sorting</button>
                    </div>
                )}
            </div>
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