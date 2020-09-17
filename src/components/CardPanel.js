import React, { useMemo } from 'react'
import Slider from 'react-slick'

import { Card } from './Card'

export const CardPanel = ({ blocks }) => {
  const cards = useMemo(() => {
    const arr = blocks.filter((i) => i['is-visible'])
    return arr.map((item, index) => {
      return Object.keys(item).length > 0 ? (
        <Card
          key={index}
          value={item.value}
          measurement={item.measurement}
          ru={item.ru}
          kz={item.kz}
          index={index + 1}
          length={arr.length}
          cardId={item.id}
        />
      ) : (
        <div className='card card_style_main' />
      )
    })
  }, [blocks])

  return <Slider {...settings}> {cards} </Slider>
}

const settings = {
  autoplay: true,
  autoplaySpeed: 20000,
  slidesToScroll: 3,
  rows: 2,
  slidesToShow: 3,
  speed: 500,
  height: '50%',
  className: 'CardPanel_style',
}
