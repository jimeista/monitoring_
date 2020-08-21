import React, { useMemo, useEffect, useState } from 'react'

import axios from 'axios'
import { PageHeader, Select } from 'antd'

//components
import { AntTable as Table } from '../components/AntTable'

export const Admin = () => {
  const { Option } = Select

  const [state, setState] = useState({ loading: true, data: [] })
  const [data, setData] = useState([])
  const [value, setValue] = useState('Алатауский район')

  useEffect(() => {
    axios
      .get('/sc-districts/api/info-blocks')
      .then((res) => {
        if (res.status === 200) {
          setState({ loading: false, data: res.data })
        }
      })
      .catch((err) => console.log(err))

    return () => setState({ loading: true, data: [] })
  }, [])

  useMemo(() => {
    if (state.data.length > 0) {
      let arr = state.data.find((item) => item.district === value)

      arr = arr
        ? arr.blocks.map((item, key) => ({
            key,
            '№': key + 1,
            ru: item.ru,
            kz: item.kz,
            measurement: item.measurement,
            'is-visible': item['is-visible'],
            value: item.value,
            id: item.id,
          }))
        : []

      setData(arr)
    }
  }, [value, state.data])

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
        <Table data={data} loading={state.loading} setData={setData} />
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
