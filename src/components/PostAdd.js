import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-validify'
import { Input, Select, TextArea, postErrors, postRules } from '../utils/FormValidationUtils'
import { addPost } from '../actions'
import { getNewId } from '../utils/Helpers'

class PostAdd extends Component {

    handleSubmit = (values) => {
        const newId = getNewId()
        this.props.addPost({id:newId,
            title: values.title,
            author: values.author,
            body: values.body,
            category: values.category,
            timestamp: Date.now(),
        })
        this.props.finishUpdate()
    }
    render(){
        return(
            <Form
                rules={postRules}
                errorMessages={postErrors}
                className="form-modal"
            >
            <h2>Add New Post</h2>
              <label>
                Title:
                <Input className="u-full-width" type="text" name="title" />
              </label>
              <label>
                Content:
                <TextArea  className="u-full-width" type="text" name="body" ></TextArea>
              </label>
            <label>
              Your Name:
              <Input type="text"  className="u-full-width" name="author" />
            </label>
                <label>
                  Category:<br />
                    <Select className="u-full-width" name="category" value="">
                        <option value="">Choose One</option>
                        <option value="react">React</option>
                        <option value="redux">Redux</option>
                        <option value="udacity">Udacity</option>
                    </Select>
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
      addPost: (post) => dispatch(addPost(post)),
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostAdd)