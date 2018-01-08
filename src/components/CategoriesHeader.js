import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
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
        const category = event.target.value
        this.setState({category})
        this.props.filterPosts(category)
        this.updateCategoryPath(category)
    }
    handleFilterClear(){
        this.setState({category:''})
        this.props.clearFilter()
        this.updateCategoryPath('')
    }
    updateCategoryPath(category){
        if(category === ''){
            this.props.history.push(`/`)
        }
        else{
            this.props.history.push(`/category/${category}`)
        }
    }
    componentDidMount() {
        this.props.getCategories()
        if(this.state.category !== ''){
            this.props.filterPosts(this.state.category)
        }
    }

    render(){
        return (
            <div>
                <select value={this.state.category} onChange={(event) => this.handleFilterChange(event)}>
                    <option value="">Filter By:</option>
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

  export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
  )(CategoriesHeader))