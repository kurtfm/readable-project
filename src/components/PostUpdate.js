import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-validify'
import { Input, Select } from './inputs';
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
            rules={{
                title: 'string|required|min:3',
                author: 'string|required|min:3',
                body: 'string|required|min:5',
                category: 'in:react,redux,udacity|required'
                }}
              values={{
                title,
                author,
                body,
                category,
              }}
        >
        <label>
          Title:
          <Input type="text" name="title" />
        </label>
        <label>
          Author:
          <Input type="text" name="author" />
        </label>
        <label>
          Body:
          <Input type="text" name="body" />
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
        <button submit onClick={values => this.handleSubmit(values)}>Add</button>
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