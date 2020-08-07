import React from 'react'
import PropTypes from 'prop-types'

export const List = ({ todos }) => {



  return (
    todos.map((todo, i) =>

      <ol key={i}>
        <li>{todo.text}</li>
      </ol>
    )
  )
}

List.propTypes = {
  todos: PropTypes.array
}
