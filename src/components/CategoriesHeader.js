import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getCategories, filterPosts, clearFilter } from '../actions'

class CategoriesHeader extends Component {
    static propTypes = {
        categoryParam:PropTypes.string.isRequired,
    }

    state = {
        category: (this.props.filter.hasOwnProperty('category') &&
        this.props.filter.category !== null) ? this.props.filter.category : this.props.categoryParam
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
        this.props.filterPosts(this.state.category)
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
                { this.state.category !== '' && (
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