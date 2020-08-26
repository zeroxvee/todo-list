import React, { useState, useEffect, useReducer } from 'react'

import api from 'api'
import { AddForm } from './AddForm'
import { List } from './List'

function reducer(state, action) {
  switch (action.type) {
    case "add":
    return state.concat({
      text: action.text,
      completed: false,
      id: state.length + 1,
    })

    case "remove":
      return state.filter(todo => todo.id != action.id)

    case "check": {
      //state.filter(({id}) => id !== toggleTodo.id).concat(toggleTodo)
      return state.map(todo => todo.id === action.foundTodo.id ? action.foundTodo : todo)
    }

    default: break
  }
}

export const DisplayList = () => {

  const [todos, dispatch] = useReducer(reducer, [])

  // useEffect(() => {
  //   const data = async () => {
  //     const list = await api.index()
  //     setTodos(list)
  //   }
  //   data()
  // }, [])

  //FX to check/uncheck a TODO
  const handleCheckbox = ({ target }) => {
    const targetID = target.parentElement.dataset.id
    const found = todos.find(({ id }) => id === Number(targetID))
    found.completed = target.checked

    dispatch({type: "check", foundTodo: found})
  }

  //FX to add a TODO task
  const handlerAddTodo = (event) => {
    event.preventDefault()
    dispatch({type: "add", text: event.target.elements[0].value})
    event.target.reset()
  }

  //FX to remove TODO task
  const removeTodo = ({target}) => {
    dispatch({type: "remove", id: target.closest("li").dataset.id, })
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
