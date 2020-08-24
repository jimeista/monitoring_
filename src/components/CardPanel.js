import React from 'react'
import Slider from 'react-slick'

import { Card } from './Card'

export const CardPanel = ({ blocks }) => {
  const cards = blocks.map((item, index) => {
    return (
      <Card
        key={index}
        value={item.value}
        measurement={item.measurement}
        ru={item.ru}
        kz={item.kz}
        index={index}
      />
    )
  })

  return <Slider {...settings}>{cards}</Slider>
}

const settings = {
  autoplay: true,
  autoplaySpeed: 18000,
  slidesToShow: 3,
  slidesToScroll: 3,
  speed: 500,
  rows: 2,
}
