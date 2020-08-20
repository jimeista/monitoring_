import React from 'react'
import { useReducer } from 'react'

const initialState = {
  columns: [],
  data: [],
}

const actionTypes = {
  col: 'col',
  data: 'data',
}

const reducer = (state, action) => {
  console.log(action.res)
  switch (action.type) {
    case actionTypes.col:
      return {
        ...state,
        columns: col,
      }
    case actionTypes.data:
      return {
        ...state,
        data: action.payload,
      }
    default:
      throw new Error()
  }
}

export const useAntTable = ({ res, payload }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setColumns = () => dispatch({ type: actionTypes.col })
  const setData = () => dispatch({ type: actionTypes.data, payload, res })

  return { state, setColumns, setData }
}

const col = [
  {
    key: 0,
    title: '№',
    dataIndex: '№',
  },
  {
    key: 1,
    title: 'Наименование на рус',
    dataIndex: 'ru',
  },
  {
    key: 2,
    title: 'Наименование на каз',
    dataIndex: 'kz',
  },
  {
    key: 3,
    title: 'Единица измерения',
    editable: true,
    dataIndex: 'ms',
  },
  {
    key: 4,
    title: 'Данные',
    dataIndex: 'data',
    editable: true,
  },
  {
    key: 5,
    title: 'Статус',
    dataIndex: 'status',
  },
]
