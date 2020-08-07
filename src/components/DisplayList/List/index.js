import React from 'react'
import PropTypes from 'prop-types'

import './List.css'

export const List = ({ todos, handler }) => {



  return (

    <div className="container">
      <div className="field">
        <ol className="">
          {todos.map(({ text, id, completed }) => (
            <li key={id} data-id={id} className={completed ? "completed" : null}>{text} <input type="checkbox" onClick={handler} />
            </li>
          )
          )}
        </ol>
      </div>
    </div>
  )
}

List.propTypes = {
  todos: PropTypes.array,
  handler: PropTypes.func
}
