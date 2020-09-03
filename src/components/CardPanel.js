import React from 'react'
import Slider from 'react-slick'

import { Card } from './Card'

export const CardPanel = ({ blocks }) => {
  const arr = blocks.filter((i) => i['is-visible'])

  const cards = arr.map((item, index) => {
    return Object.keys(item).length > 0 ? (
      <Card
        key={index}
        value={item.value}
        measurement={item.measurement}
        ru={item.ru}
        kz={item.kz}
        index={index + 1}
        length={arr.length}
        id={'style_img' + item.id}
      />
    ) : (
      <div className='card card_style_main' />
    )
  })

  return <Slider {...settings}> {cards} </Slider>
}

const settings = {
  infinite: true,
  autoplay: true,
  autoplaySpeed: 19000,
  slidesToScroll: 3,
  rows: 2,
  slidesToShow: 3,
  speed: 500,
  height: '50%',
  className: 'CardPanel_style',
}
