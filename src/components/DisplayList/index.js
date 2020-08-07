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



  return (
    <div>
    <List todos={todos}/>
    <AddForm todos={todos}/>
    </div>
  )
}
