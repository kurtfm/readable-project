import Axios from 'axios'

const api = "http://localhost:3001"

let token = localStorage.token
if (!token){
  token = localStorage.token = Math.random().toString(36).substr(-8)
}

const axios = Axios.create({
  baseURL: api,
  headers: {'Authorization': token}
})

export const getAllPosts = () =>
  axios.get('/posts')
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