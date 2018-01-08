import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { removePost } from '../actions'
import TrashIcon from 'react-icons/lib/fa/trash-o'

class PostRemove extends Component {
    static propTypes = {
        id:PropTypes.string.isRequired,
        size:PropTypes.number.isRequired,
        onRemoveGoBack:PropTypes.bool,
    }

    removePost(id){
        this.props.removePost(id)
        if(this.props.hasOwnProperty('onRemoveGoBack')){
            this.props.history.goBack()
        }
    }

    render(){
        return (
           <button className="de-button" onClick={()=>this.removePost(this.props.id)}>
                <TrashIcon size={this.props.size} color="grey" /> Remove
            </button>
        )
    }
}
function mapStateToProps (state) {
    return {}
}

function mapDispatchToProps (dispatch) {
    return {
        removePost: (id) => dispatch(removePost(id)),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
    )(PostRemove))