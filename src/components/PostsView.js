import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts, clearPost, clearComments, updateModalKey } from '../actions'
import PostSummary from './PostSummary'
import CategoriesHeader from './CategoriesHeader'
import SortHeader from './SortHeader'
import PostAdd from './PostAdd'
import Modal from 'react-modal'
import { getNewModalKey,
        sortByCharacters,
        sortByComparison,
        sortByTime } from '../utils/Helpers'
import ListIcon from 'react-icons/lib/fa/list'
import BookIcon from 'react-icons/lib/go/book'

class PostsView extends Component {

    componentDidMount() {
        this.props.getPosts()
        this.props.clearPost()
        this.props.clearComments()
    }
    state = {
        modalKey: '',
      }
      openModal = () => {
        const newModalKey = getNewModalKey()
        this.setState({modalKey: newModalKey})
        this.props.updateModalKey(newModalKey)
      }
      closeModal = () => {
        this.props.updateModalKey(null)
      }
    render(){
        const categoryParam = (this.props.hasOwnProperty('match') &&
            this.props.match.hasOwnProperty('params') &&
            this.props.match.params.hasOwnProperty('category')) ?
            this.props.match.params.category : ''
        return (
            <div className="main-page">
                <div className="container">
                    <div className="row">
                        <section className="one-third column left-titles">
                            <h1 className="title"><BookIcon size={60} color="rgb(115, 131, 165)" /> Reada.bl</h1>
                            <div className="sub-title">Read, create and respond.</div>
                        </section>
                        <section className="two-thirds column posts-list">
                            <button className="add-post-button" onClick={this.openModal}>
                                Add New Post
                            </button>
                            <div className="list-utilities">
                                <ListIcon className="svg-no-hover" size={40} color="grey" />
                                <CategoriesHeader categoryParam={categoryParam} />
                                <SortHeader />
                            </div>
                            {this.props.posts.length < 1 && (
                            <div>no posts found</div>
                            )}
                            {this.props.posts.map(({ id }) => (
                                <PostSummary id={id} key={id}/>
                            ))}
                        </section>
                    </div>
                </div>
                <Modal
                    className='modal'
                    overlayClassName='modal-overlay'
                    isOpen={this.state.modalKey === this.props.modalKey}
                    onRequestClose={this.closeModal}
                    contentLabel='Add New Post'
                >
                    <PostAdd finishUpdate={this.closeModal} />
                </Modal>
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
        modalKey: state.modal.key,
    }
  }

  function mapDispatchToProps (dispatch) {
    return {
      getPosts: () => dispatch(getPosts()),
      clearPost: () => dispatch(clearPost()),
      clearComments: () => dispatch(clearComments()),
      updateModalKey: (key) => dispatch(updateModalKey(key)),
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostsView)