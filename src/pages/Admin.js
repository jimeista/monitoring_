import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { PageHeader, Select } from 'antd'

//components
import { AntTable as Table } from '../components/AntTable'

export const Admin = () => {
  const { Option } = Select

  const [state, setState] = useState({ loading: true, data: [] })
  const [value, setValue] = useState('')

  useEffect(() => {
    axios
      .get(`/sc-districts/api/info-blocks?district=${value}`)
      .then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          setState({
            loading: false,
            data: res.data[0].blocks.map((item, key) => ({
              key,
              '№': key + 1,
              ru: item.ru,
              kz: item.kz,
              measurement: item.measurement,
              'is-visible': item['is-visible'],
              value: item.value,
              id: item.id,
            })),
          })
        }
      })
      .catch((err) => console.log(err))

    return () => setState({ loading: true, data: [] })
  }, [value])

  return (
    <>
      <PageHeader className='admin-header' title='Админ панель' />
      <div className='admin-wrapper'>
        <Select
          allowClear
          placeholder='Районы Алматы'
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
        <Table
          data={state.data}
          loading={value ? state.loading : false}
          setData={setState}
        />
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
