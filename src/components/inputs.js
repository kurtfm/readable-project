import React from 'react';

export const Input = ({ error, ...props }) => {
  return (
    <div>
      <p>{error}</p>
      <input {...props} />
    </div>
  )
}

export const Select = ({ error, ...props }) => {
    return (
      <div>
        <p>{error}</p>
        <select {...props} />
      </div>
    )
  }