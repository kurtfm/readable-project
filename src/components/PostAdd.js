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
            >
            <h2>Add New Post</h2>
            <div className="row">
              <div className="twelve columns">
                <label>
                  Title:
                  <Input className="u-full-width" type="text" name="title" />
                </label>
              </div>
            </div>
            <div className="row">
              <div className="twelve columns">
              <label>
                Content:
                <TextArea  className="u-full-width" type="text" name="body" ></TextArea>
              </label>
              </div>
            </div>
            <label>
              Your Name:
              <Input type="text"  className="u-full-width" name="author" />
            </label>
            <div className="row">
              <div className="twelve columns">
                <label>
                  Category:<br />
                    <Select className="u-full-width" name="category" value="">
                        <option value="">Choose One</option>
                        <option value="react">React</option>
                        <option value="redux">Redux</option>
                        <option value="udacity">Udacity</option>
                    </Select>
                </label>
                </div>
            </div>
            <div className="row">
              <div className="six columns">
                <button className="button-primary" submit onClick={values => this.handleSubmit(values)}>Add</button>
              </div>
              <div className="six columns">
                <button onClick={()=>(this.props.finishUpdate())}>Cancel</button>
              </div>
            </div>
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