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

  const handleCheckbox = ({target}) => {
    const targetID = target.parentElement.dataset.id
    console.log(targetID)

    setTodos(prev => {
      const found = prev.find(({id}) => id === Number(targetID))
      found.completed = true

     return todos.map(todo => todo.id === found.id ? found : todo)

    })
  }

  return (
    <div>
      <List todos={todos} />
      <AddForm todos={todos} handler={handleCheckbox} />
    </div>
  )
}
