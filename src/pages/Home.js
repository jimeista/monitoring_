import React, { useRef, useEffect, useState } from 'react'
import Slider from 'react-slick'
import { useSelector } from 'react-redux'

import { CardPanel } from '../components/CardPanel'
import { HomeHeader } from '../components/HomeHeader'
import { HomeHero } from '../components/HomeHero'

const Home = () => {
  const { home } = useSelector((state) => state.home)

  let sliderRef = useRef()

  return (
    <div className='home'>
      <HomeHeader />
      {home.status === 'success' && (
        <Slider ref={sliderRef} {...settings}>
          {home.data.map((item) => {
            return (
              <div className='carousel-wrapper' key={item.district}>
                <HomeHero
                  data={{ date: item['last-edit'], title: item.district }}
                />
                <CardPanel blocks={item.blocks} />
              </div>
            )
          })}
        </Slider>
      )}
    </div>
  )
}

export default React.memo(Home)

const settings = {
  fade: true,
  slidesToShow: 1,
  lazyLoad: true,
  speed: 500,
  height: '100%',
  className: 'Body_card_wrapper',
}
