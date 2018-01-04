import Axios from 'axios'

const api = "http://localhost:3001"

const axios = Axios.create({
    baseURL: api,
    headers: {'Authorization': process.env.REACT_APP_API_TOKEN}
  })
  /** 
  axios.interceptors.request.use(function (config) {
    console.log(config)
    return config;
  }, function (error) {
    console.log(error)
    return Promise.reject(error);
  })
  axios.interceptors.response.use(function (response) {
    console.log(response)
    return response;
  }, function (error) {
    console.log(error)
    return Promise.reject(error);
  })
*/
export const getAllPosts = () =>
  axios.get('/posts')
  .then(response => response.data)
  .catch((error) => {
    console.log(error);
  })

export const getSinglePost = (id) =>
  axios.get(`/posts/${id}`)
  .then(response => response.data)
  .catch((error) => {
    console.log(error);
  })

export const putPost = ({ id, title, body, author, category}) =>
  axios.put(`/posts/${id}`,{ title, author, body, category })
  .then(response => response.data)
  .catch((error) => {
    console.log(error);
  })

export const postPost = ({ id, title, body, author, category, timestamp }) =>
  axios.post(`/posts/`,{ id, title, author, body, category, timestamp })
  .then(response => response.data)
  .catch((error) => {
    console.log(error);
  })

export const getAllCategories = () =>
  axios.get('/categories')
  .then(response => response.data)
  .catch((error) => {
    console.log(error);
  })

export const getAllComments = (id) =>
  axios.get(`posts/${id}/comments`)
  .then(response => response.data)
  .catch((error) => {
    console.log(error);
  })
export const putCommentEdit = ({ id, body, author }) =>
  axios.put(`/comments/${id}`,{ author, body })
  .then(response => response.data)
  .catch((error) => {
    console.log(error);
  })
export const postComment = ({ id, author, body, parentId, timestamp }) =>
  axios.post(`/comments/`,{ id, author, body, parentId, timestamp })
  .then(response => response.data)
  .catch((error) => {
    console.log(error);
  })
export const deleteComment = (id) =>
  axios.delete(`/comments/${id}`)
  .then(response => response.data)
  .catch((error) => {
    console.log(error);
  })
export const incrementPostVote = (id) =>
  axios.post(`posts/${id}`,{option:'upVote'})
  .then(response => response.data)
  .catch((error) => {
    console.log(error);
  })
export const decrementPostVote = (id) =>
  axios.post(`posts/${id}`,{option:'downVote'})
  .then(response => response.data)
  .catch((error) =>{
    console.log(error);
  })

export const incrementCommentVote = (id) =>
  axios.post(`comments/${id}`,{option:'upVote'})
  .then(response => response.data)
  .catch((error) =>{
    console.log(error);
  })

export const decrementCommentVote = (id) =>
  axios.post(`comments/${id}`,{option:'downVote'})
  .then(response => response.data)
  .catch((error) =>{
    console.log(error);
  })