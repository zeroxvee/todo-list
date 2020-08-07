import React from 'react'
import PropTypes from 'prop-types'

export const AddForm = ({ handler }) => {


  return (
    <form onSubmit={handler}>
      <input className="input" type="text"/>
      <button>Add ToDo</button>
    </form>
  )
}

AddForm.propTypes = {
  handler: PropTypes.func
}
