import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-validify'
import PropTypes from 'prop-types'
import { addComment } from '../actions'
import { getNewId } from '../utils/Helpers'
import { Input, TextArea, commentErrors, commentRules } from '../utils/FormValidationUtils'

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
                rules={commentRules}
                errorMessages={commentErrors}
                className="form-modal"
            >
            <h2>Add New Comment</h2>
            <label>
              Your Name:
              <Input className="u-full-width" type="text" name="author" />
            </label>
            <label>
              Comment:
              <TextArea className="u-full-width" type="text" name="body" ></TextArea>
            </label>
            <button submit className="button-primary" onClick={values => this.handleSubmit(values)}>Add</button>
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