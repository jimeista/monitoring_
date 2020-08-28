import React from 'react'
import Slider from 'react-slick'

import { Card } from './Card'

export const CardPanel = ({ blocks }) => {
  const cards = blocks.map((item, index) => {
    return Object.keys(item).length > 0 ? (
      <Card
        key={index}
        value={item.value}
        measurement={item.measurement}
        ru={item.ru}
        kz={item.kz}
        index={index + 1}
      />
    ) : (
      <div className='card card_style_main' />
    )
  })

  return <Slider {...settings}>{cards} </Slider>
}

const settings = {
  autoplay: true,
  autoplaySpeed: 19000,
  slidesToShow: 3,
  slidesToScroll: 3,
  speed: 500,
  rows: 2,
  height: '50%',
  border: '1px solid red',
  className: 'CardPanel_style',
}
