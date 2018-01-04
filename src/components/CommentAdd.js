import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-validify'
import PropTypes from 'prop-types'
import { addComment } from '../actions'
import { getNewId } from '../utils/Helpers'
import { Input } from './inputs'

class CommentAdd extends Component {

    static propTypes = {
        parentId:PropTypes.string.isRequired,
    }

    handleSubmit = (values) => {
        const newId = getNewId()
        this.props.addComment({id:newId,
            author: values.author,
            body: values.body,
            timestamp: Date.now(),
            parentId: this.props.parentId,
        })
        this.props.finishUpdate()
    }
    render(){
        return(
            <Form
                rules={{
                    author: 'string|required|min:3',
                    body: 'string|required|min:5',
                    }}
            >
            <label>
              Author:
              <Input type="text" name="author"/>
            </label>
            <label>
              Body:
              <Input type="text" name="body" />
            </label>
            <button submit onClick={values => this.handleSubmit(values)}>Add</button>
            <button onClick={()=>(this.props.finishUpdate())}>Cancel</button>
          </Form>
        )
    }
}

function mapStateToProps (state) {
    return {}
  }

  function mapDispatchToProps (dispatch) {
    return {
      addComment: (comment) => dispatch(addComment(comment)),
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CommentAdd)