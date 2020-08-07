import React, { useState, useEffect } from 'react'

import api from 'api'
import { AddForm } from './AddForm'
import { List } from './List'

export const DisplayList = () => {

  const [todos, setTodos] = useState([])

  useEffect(() => {
    const data = async () => {
      const list = await api.index()
      setTodos(list)
    }
    data()
  }, [])

  const handleCheckbox = ({ target }) => {
    const targetID = target.parentElement.dataset.id
    console.log(targetID)

    setTodos(() => {
      const found = todos.find(({ id }) => id === Number(targetID))
      found.completed = target.checked

      return todos.map(todo => todo.id === found.id ? found : todo)
    })
  }

  const handlerAddTodo = (event) => {
    event.preventDefault()
    const todo = {}
    todo.text = event.target.elements[0].value
    todo.completed = false
    todo.id = todos.length + 1
    setTodos(prev => prev.concat(todo))
  }

  return (
    <div className="wrapper">
      <p className="panel-heading">ToDo List</p>
      <List todos={todos} handler={handleCheckbox} />
      <AddForm todos={todos} handler={handlerAddTodo} />
    </div>
  )
}
