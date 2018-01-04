import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategories, filterPosts, clearFilter } from '../actions'

class CategoriesHeader extends Component {
    state = {
        category: this.categoryHasBeenSet ? this.props.filter.category : '',
    }

    categoryHasBeenSet(){
        return this.props.filter.hasOwnProperty('category') && this.props.filter.category !== null
    }

    handleFilterChange(event){
        this.setState({category:event.target.value})
        this.props.filterPosts(event.target.value)
    }
    handleFilterClear(){
        this.setState({category:''})
        this.props.clearFilter()
    }
    componentDidMount() {
        this.props.getCategories()
    }

    render(){
        return (
            <div>
                Filter by category:
                <select value={this.state.category} onChange={(event) => this.handleFilterChange(event)}>
                    <option value=""></option>
                    {this.props.categories.map((category,index) => (
                        <option key={index} value={category} >{category}</option>
                    ))}
                </select>
                { this.categoryHasBeenSet() && (
                    <button onClick={() => this.handleFilterClear()}>Clear Filter</button>
                )}
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        categories: Object.keys(state.categories),
        filter: state.filter
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