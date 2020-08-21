import React, { useState } from 'react'

// import axios from 'axios'
import { EditableCell } from './EditableCell'

import { Table, Popconfirm, Form } from 'antd'
import { EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons'

export const AntTable = (props) => {
  const [form] = Form.useForm()
  const [editingKey, setEditingKey] = useState('')

  const isEditing = (record) => record.key === editingKey

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async (record) => {
    try {
      const row = await form.validateFields()
      const newData = [...props.data]
      const index = newData.findIndex((item) => record.key === item.key)
      if (index > -1) {
        let item = newData[index]
        item = { ...item, ms: row.ms, status: row.status, data: row.data }
        newData.splice(index, 1, { ...item, ...row })
        props.setData((state) => ({
          ...state,
          data: newData,
        }))

        // axios
        //   .put(`http://localhost:3000/api/${record.parentId}`, newData)
        //   .then((res) => console.log(res))
        //   .catch((err) => console.log(err))
        setEditingKey('')
      } else {
        newData.push(row)
        props.setState((state) => ({
          ...state,
          data: newData,
        }))
        setEditingKey('')
      }
      setEditingKey('')
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  let mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        type: col.type,
        dataIndex: col.dataIndex,
        editing: isEditing(record),
      }),
    }
  })

  mergedColumns = [
    ...mergedColumns,
    {
      dataIndex: '',
      key: 'x',
      width: 90,
      render: (_, record) => {
        const editable = isEditing(record)
        return editable ? (
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <a
              onClick={() => save(record)}
              style={{
                marginRight: 8,
              }}
            >
              <SaveOutlined className='icon_edit_btn_style' title='Сохранить' />
            </a>
            <Popconfirm
              title='Вы уверены что хотите оменить изменения?'
              onConfirm={cancel}
            >
              <CloseOutlined className='icon_edit_btn_style' title='Отменить' />
            </Popconfirm>
          </span>
        ) : (
          <a
            disabled={editingKey !== ''}
            onClick={() => edit(record, form, setEditingKey)}
          >
            <EditOutlined
              className='icon_edit_btn_style'
              title='Редактировать'
              style={{ display: 'flex', justifyContent: 'center' }}
            />
          </a>
        )
      },
    },
  ]

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        loading={props.loading}
        bordered
        dataSource={props.data}
        columns={mergedColumns}
        rowClassName='editable-row'
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  )
}

const columns = [
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
    title: 'Ед измерения',
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
    editable: true,
  },
]
