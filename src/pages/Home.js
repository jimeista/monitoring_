import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import axios from 'axios'

import { CardPanel } from '../components/CardPanel'
import { HomeHeader } from '../components/HomeHeader'
import { HomeHero } from '../components/HomeHero'

export const Home = () => {
  const [state, setState] = useState({ loading: true })

  useEffect(() => {
    axios
      .get(`/sc-districts/api/info-blocks`)
      .then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          setState({ data: res.data, loading: false })
        }
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className='home'>
      <HomeHeader />
      {!state.loading && (
        <Slider {...settings}>
          {state.data.map((item) => {
            const blocks = item.blocks.filter((item) => item['is-visible'])

            return (
              <div className='carousel-wrapper' key={item.district}>
                <HomeHero
                  data={{
                    date: item['last-edit'],
                    title: item.district,
                  }}
                />
                {!state.loading && <CardPanel blocks={blocks} />}
              </div>
            )
          })}
        </Slider>
      )}
    </div>
  )
}

const settings = {
  autoplay: true,
  autoplaySpeed: 51000,
  slidesToShow: 1,
  lazyLoad: true,
  slidesToScroll: 1,
  speed: 500,
}
