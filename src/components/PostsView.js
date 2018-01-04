import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts, clearPost, clearComments } from '../actions'
import PostSummary from './PostSummary'
import CategoriesHeader from './CategoriesHeader'
import SortHeader from './SortHeader'
import PostAdd from './PostAdd'
import Modal from 'react-modal'

class PostsView extends Component {

    componentDidMount() {
        this.props.getPosts()
        this.props.clearPost()
        this.props.clearComments()
    }
    state = {
        addModalOpen: false,
    }
    openAddModal = ({ meal, day }) => {
    this.setState(() => ({
        addModalOpen: true,
    }))
    }
    closeAddModal = () => {
    this.setState(() => ({
        addModalOpen: false,
    }))
    }
    render(){
        const { addModalOpen } = this.state
        const categoryParam = (this.props.hasOwnProperty('match') &&
            this.props.match.hasOwnProperty('params') &&
            this.props.match.params.hasOwnProperty('category')) ?
            this.props.match.params.category : ''
        return (
            <div>
                <SortHeader />
                <CategoriesHeader categoryParam={categoryParam} />
                <button onClick={this.openAddModal}>Add New Post</button>
                <Modal
                        className='modal'
                        overlayClassName='overlay'
                        isOpen={addModalOpen}
                        onRequestClose={this.closeAddModal}
                        contentLabel='Modal'
                    >
                        <PostAdd finishUpdate={this.closeAddModal} />
                </Modal>
                {this.props.posts.length < 1 && (
                    <div>no posts found</div>
                )}
                <ul>
                {this.props.posts.map(({ id }) => (
                    <li key={id}>
                        <PostSummary id={id}/>
                    </li>
                ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps (state) {
    const entries = state.posts
    const entriesArr = Object.keys(entries)[0] ? Object.keys(entries).map(id => {
        if(entries[id].deleted === false){
            return {...entries[id],id}
        }
        else{
            return null
        }
    }) : []

    const preppedPosts = (posts) => {
        let retArr = posts
        const {filter} = state
        const { category, sortBy, orderBy } = state.filter
        const orderByAscending = !filter.hasOwnProperty('orderBy') || (orderBy === 'ascending' || orderBy === null)

        const sortByCharacters = (arr,key,asc) => (
            arr.sort((a,b) => {
                const str1 = a[key].toLowerCase().replace(/\s/g,'')
                const str2 = b[key].toLowerCase().replace(/\s/g,'')
                if(str1 < str2){
                    return asc ? -1 : 1
                }
                if(str1 > str2){
                    return asc ? 1 : -1
                }
                return 0
            })
        )
        const sortByComparison = (arr,key,asc) => (
            arr.sort((a,b) => {
                const str1 = a[key]
                const str2 = b[key]
                if(str1 > str2){
                    return asc ? -1 : 1
                }
                if(str1 < str2){
                    return asc ? 1 : -1
                }
                return 0
            })
        )

        const sortByTime = (arr,asc) => (
            arr.sort((a,b) => {
                return asc ? a.timestamp - b.timestamp :
                    b.timestamp - a.timestamp
            })
        )

        if(filter.hasOwnProperty('category') && category !== null){
            retArr = posts.filter((post) => (post.category === category))
        }
        if(filter.hasOwnProperty('sortBy') && filter.sortBy !== null){
            switch(sortBy){
                case 'time':
                    retArr = sortByTime(retArr,orderByAscending)
                    break
                case 'votes':
                    retArr = sortByComparison(retArr,'voteScore',orderByAscending)
                    break
                default:
                    retArr = sortByCharacters(retArr,sortBy,orderByAscending)
                    break
            }
        }
        else{
            retArr = sortByTime(retArr,false)
        }

        return retArr
    }

    return {
        posts: preppedPosts(entriesArr),
    }
  }

  function mapDispatchToProps (dispatch) {
    return {
      getPosts: () => dispatch(getPosts()),
      clearPost: () => dispatch(clearPost()),
      clearComments: () => dispatch(clearComments()),
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostsView)