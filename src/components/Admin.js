import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { PageHeader, Select } from 'antd'

//components
import { AntTable as Table } from './AntTable'

export const Admin = () => {
  const { Option } = Select

  const [state, setState] = useState({ loading: true, data: [] })
  const [value, setValue] = useState('Алатауский район')

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api?name=${value}`)
      .then((res) => {
        if (res.status === 200) {
          setState((state) => ({
            ...state,
            loading: false,
            data: res.data[0]
              ? res.data[0].blocks.map((item, key) => ({
                  key,
                  '№': key + 1,
                  ru: item.ru,
                  kz: item.kz,
                  ms: item.ms,
                  status: item.status,
                  data: item.data,
                  id: item.id,
                  parentId: res.data[0].id,
                }))
              : [],
          }))
        }
      })
      .catch((err) => console.log(err))

    return () => {
      setState({
        loading: true,
        data: [],
      })
    }
  }, [value])

  return (
    <>
      <PageHeader className='admin-header' title='Админ панель' />
      <div className='admin-wrapper'>
        <Select
          allowClear
          placeholder='Районы Алматы'
          defaultValue='Алатауский район'
          onChange={(value) => setValue(value)}
          style={{
            width: 250,
            marginBottom: 20,
          }}
        >
          {districts.map((dis) => (
            <Option key={dis}>{dis}</Option>
          ))}
        </Select>
        <Table data={state.data} loading={state.loading} setData={setState} />
      </div>
    </>
  )
}

const districts = [
  'Алатауский район',
  'Алмалинский район',
  'Ауэзовский район',
  'Бостандыкский район',
  'Жетесуский район',
  'Медеуский район',
  'Наурызбайский район',
  'Турксибский район',
]
