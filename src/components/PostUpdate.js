import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-validify'
import { Input, Select, TextArea, postRules, postErrors } from '../utils/FormValidationUtils'
import { editPost } from '../actions'


class PostUpdate extends Component {

    handleSubmit = (values) => {
        this.props.editPost({id:this.props.id,
            title: values.title,
            author: values.author,
            body: values.body,
            category: values.category})
        this.props.finishUpdate()
    }
    render(){
      const { author, body, title, category, } = this.props
      return(
        <Form
            onSubmit={this.handleSubmit}
            rules={postRules}
            errorMessages={postErrors}
            values={{
              title,
              author,
              body,
              category,
            }}
            className="form-modal"
        >
        <h2>Update Post</h2>
        <label>
          Title:
          <Input className="u-full-width" type="text" name="title" />
        </label>
        <label>
          Content:
          <TextArea className="u-full-width" type="text" name="body" ></TextArea>
        </label>
        <label>
          Your Name:
          <Input className="u-full-width" type="text" name="author" />
        </label>
        <label>
          Category:<br />
            <Select name="category" value="">
                <option value="">Choose One</option>
                <option value="react">React</option>
                <option value="redux">Redux</option>
                <option value="udacity">Udacity</option>
            </Select>
        </label>
        <button className="button-primary" submit onClick={values => this.handleSubmit(values)}>Update</button>
        <button onClick={()=>(this.props.finishUpdate())}>Cancel</button>
      </Form>
    )
    }
}
function mapStateToProps (state) {
    return {
        id: state.post.id,
        author: state.post.author,
        body: state.post.body,
        category: state.post.category,
        title: state.post.title,
    }
  }

  function mapDispatchToProps (dispatch) {
    return {
        editPost: (edits) => dispatch(editPost(edits)),
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostUpdate)