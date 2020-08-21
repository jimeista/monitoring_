import React, { useMemo, useEffect, useState } from 'react'

import axios from 'axios'
import { PageHeader, Select } from 'antd'

//components
import { AntTable as Table } from '../components/AntTable'

export const Admin = () => {
  const { Option } = Select

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [value, setValue] = useState('Алатауский район')

  useEffect(() => {
    axios
      .get('/sc-districts/api/info-blocks')
      .then((res) => {
        if (res.status === 200) {
          setData(res.data)
          setLoading(false)
        }
      })
      .catch((err) => console.log(err))

    return () => setLoading(true)
  }, [])

  let dataSource = useMemo(() => {
    if (data.length > 0) {
      const arr = data.find((item) => item.district === value)

      console.log(arr)
      return arr.blocks.map((item, key) => ({
        key,
        '№': key + 1,
        ru: item.ru,
        kz: item.kz,
        ms: item.measurement,
        status: item.status,
        data: item.value,
        id: item.id,
      }))
    }
  }, [value, data])

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
        <Table data={dataSource} loading={loading} />
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
