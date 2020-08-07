import React, { useState, useEffect } from 'react'

import api from 'api'
import { AddForm } from './AddForm'

export const DisplayList = () => {

  const [todos, setTodos] = useState([])

  useEffect(() => {
    const data = async () => {
      const list = await api.index()
      setTodos(list)
    }
    data()
  }, [])

  return (
    todos.map((todo, i) =>

      <div key={i}>
        <p>Hey, its working!</p>
        <input type="checkbox" checked={todo.completed}></input>
      </div>
    )
  )
}
