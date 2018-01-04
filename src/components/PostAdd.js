import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-validify'
import { Input, Select } from './inputs'
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
                onSubmit={this.handleSubmit}
                rules={{
                    title: 'string|required|min:3',
                    author: 'string|required|min:3',
                    body: 'string|required|min:5',
                    category: 'in:react,redux,udacity|required'
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