import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'react-validify'
import { Input, TextArea, commentErrors, commentRules } from '../utils/FormValidationUtils'
import { editComment } from '../actions'


class PostUpdate extends Component {
    static propTypes = {
        id:PropTypes.string.isRequired,
        author:PropTypes.string.isRequired,
        body:PropTypes.string.isRequired,
    }

    handleSubmit = (values) => {
        this.props.editComment({id: this.props.id,
            author: values.author,
            body: values.body,
        })
        this.props.finishUpdate()
    }
    render(){
        const { author, body } = this.props
        return(
            <Form
                rules={commentRules}
                errorMessages={commentErrors}
                values={{
                    author,
                    body,
                }}
                className="form-modal"
            >
            <h2>Update Comment</h2>
            <label>
                Author:
                <Input className="u-full-width" type="text" name="author" foo="bar"/>
            </label>
            <label>
                Body:
                <TextArea className="u-full-width" type="text" name="body" ></TextArea>
            </label>
            <button className="button-primary" submit onClick={values => this.handleSubmit(values)}>Add</button>
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
        editComment: (edits) => dispatch(editComment(edits)),
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostUpdate)