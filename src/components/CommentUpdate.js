import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'react-validify'
import { Input } from './inputs';
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
                rules={{
                    author: 'string|required|min:3',
                    body: 'string|required|min:5',
                    }}
                values={{
                    author,
                    body,
                }}
            >
            <label>
                Author:
                <Input type="text" name="author" foo="bar"/>
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
        editComment: (edits) => dispatch(editComment(edits)),
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostUpdate)