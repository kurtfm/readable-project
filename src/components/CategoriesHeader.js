import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategories, filterPosts, clearFilter } from '../actions'

class CategoriesHeader extends Component {

    componentDidMount() {
        this.props.getCategories()
    }

    render(){
        return (
            <ul>
                {this.props.categories.map((category,index) => (
                    <li key={index}><button onClick={() => this.props.filterPosts(category)}>{category}</button></li>
                ))}
                <li><button onClick={() => this.props.clearFilter()}>Clear Filter</button></li>
            </ul>
        )
    }
}

function mapStateToProps (state) {
    return {
        categories: Object.keys(state.categories),
    }
  }

  function mapDispatchToProps (dispatch) {
    return {
      getCategories: () => dispatch(getCategories()),
      filterPosts: (category) => dispatch(filterPosts(category)),
      clearFilter: () => dispatch(clearFilter()),
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CategoriesHeader)