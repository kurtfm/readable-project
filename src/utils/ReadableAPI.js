import Axios from 'axios'

const api = "http://localhost:3001"

const axios = Axios.create({
    baseURL: api,
    headers: {'Authorization': process.env.REACT_APP_API_TOKEN}
  })

export const getAllPosts = () =>
  axios.get('/posts')
  .then(response => response.data)
  .catch(function (error) {
    console.log(error);
  })

  export const getSinglePost = (id) =>
  axios.get(`/posts/${id}`)
  .then(response => response.data)
  .catch(function (error) {
    console.log(error);
  })

export const getAllCategories = () =>
  axios.get('/categories')
  .then(response => response.data)
  .catch(function (error) {
    console.log(error);
  })

  export const getAllComments = (id) =>
  axios.get(`posts/${id}/comments`)
  .then(response => response.data)
  .catch(function (error) {
    console.log(error);
  })