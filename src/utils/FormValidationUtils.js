import React from 'react';

export const Input = ({ error, ...props }) => {
  return (
    <div>
      <div className="validation-error">{error}</div>
      <input {...props} />
    </div>
  )
}

export const TextArea = ({ error, ...props }) => {
  return (
    <div>
      <div className="validation-error">{error}</div>
      <textarea {...props} />
    </div>
  )
}

export const Select = ({ error, ...props }) => {
    return (
      <div>
        <div className="validation-error">{error}</div>
        <select {...props} />
      </div>
    )
  }

export const commentErrors = {
  'required.author': 'A name is required.',
  'min.author': 'Your name is too short.',
  'max.author': 'Your name is too long.',
  'required.body': 'A comment is required.',
  'min.body': 'Your comment is too short.',
  'max.body': 'Your comment is too long.',
}

export const commentRules = {
  author: 'string|required|min:2|max:100',
  body: 'string|required|min:3|max:300',
}

export const postErrors = {
  'required.author': 'A name is required.',
  'min.author': 'Your name is too short.',
  'max.author': 'Your name is too long.',
  'required.body': 'Some post content is required.',
  'min.body': 'Your post content is too short.',
  'max.body': 'Your post content is too long.',
  'required.title': 'A title for your post is required.',
  'min.title': 'Your title is too short.',
  'max.title': 'Your title is too long.',
  'required.category': 'You must choose a category.',
}

export const postRules = {
  title: 'string|required|min:3|max:200',
  author: 'string|required|min:2|max:100',
  body: 'string|required|min:3|max:500',
  category: 'in:react,redux,udacity|required',
}