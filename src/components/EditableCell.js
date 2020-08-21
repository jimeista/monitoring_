import React from 'react'
import { Select, Input, InputNumber, Form } from 'antd'

export const EditableCell = ({
  editing,
  dataIndex,
  record,
  children,
  ...restProps
}) => {
  const inputNode = customSwitch(dataIndex)

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={
            dataIndex !== 'measurement' && [
              {
                required: true,
                message: `Заполните поле!`,
              },
            ]
          }
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

const customSwitch = (dataIndex) => {
  switch (dataIndex) {
    case 'is-visible':
      return (
        <Select>
          <Select.Option value={true} key='Открыт'>
            Открыт
          </Select.Option>
          <Select.Option value={false} key='Скрыт'>
            Скрыт
          </Select.Option>
        </Select>
      )
    case 'value':
      return <InputNumber />
    default:
      return <Input placeholder='Введите значение' />
  }
}
