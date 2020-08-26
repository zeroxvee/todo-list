import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import './List.scss'

export const List = ({ todos, handler, handleTrash }) => {



  return (

    <div className="container">
      <div className="field">
        <ol className="">
          {todos.map(({ text, id, completed }) => (
            <li key={id} data-id={id} className={completed ? "completed" : null}>{text} <input type="checkbox" onClick={handler} />
            <FontAwesomeIcon icon={faTrash} onClick={handleTrash} className="has-text-danger "/>
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
  handler: PropTypes.func,
  handleTrash: PropTypes.func
}
