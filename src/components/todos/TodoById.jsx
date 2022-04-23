import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getTodoByIdAction } from '../../store/actions/todo'
import cls from '../../styles/AuthForm.module.css'
import { TodoPage } from './TodoPage'

export const TodoById = () => {
  const param = useParams()
  const dispatch = useDispatch()
  const todoState = useSelector(state => state.todo)

  useEffect(() => {
    getTodoByIdAction(dispatch, param.id)
  }, [])

  return (
    <div>
      <h1 className={cls.title}>Заметка</h1>
      <div style={{ width: "550px", marginLeft: "35%" }}>
        <TodoPage {...todoState.todo} />
      </div>
    </div>
  )
}
