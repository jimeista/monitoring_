import React from 'react'

import { Card } from './Card'

export const CardPanel = ({ blocks }) => {
  return (
    <>
      {blocks.map((item) => (
        <Card
          value={item.value}
          measurement={item.measurement}
          ru={item.ru}
          kz={item.kz}
        />
      ))}
    </>
  )
}
