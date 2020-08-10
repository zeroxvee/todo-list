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

  //FX to check/uncheck a TODO
  const handleCheckbox = ({ target }) => {
    const targetID = target.parentElement.dataset.id
    console.log(targetID)

    setTodos(() => {
      const found = todos.find(({ id }) => id === Number(targetID))
      found.completed = target.checked

      return todos.map(todo => todo.id === found.id ? found : todo)
    })
  }

  //FX to add a TODO task
  const handlerAddTodo = (event) => {
    event.preventDefault()
    const todo = {}
    todo.text = event.target.elements[0].value
    todo.completed = false
    todo.id = todos.length + 1
    setTodos(prev => prev.concat(todo))
    event.target.reset()
  }

  //FX to remove TODO task
  const removeTodo = ({target}) => {
    const id = target.closest("li").dataset.id
    setTodos(prev => prev.filter(todo => todo.id != id))
  }

  //Render TODO list and count how many todo are done
  const renderTodos = () => {
    const tasksDone = todos.filter(({completed}) => completed).length

    return (
      <>
        <div className="has-text-centered">
          <p>{new Date().toLocaleDateString()}</p>
          <p className={todos.length/tasksDone <= 2 ? "has-text-success" : "has-text-danger"}>Todo&apos;s Done: {tasksDone}/{todos.length}</p>
        </div>
        <List todos={todos} handler={handleCheckbox} handleTrash={removeTodo}/>
      </>
    )
  }

  return (
    <div className="wrapper">
      <p className="panel-heading">TO DO List</p>
      <>{renderTodos()}</>
      <AddForm todos={todos} handler={handlerAddTodo} />
    </div>
  )
}
