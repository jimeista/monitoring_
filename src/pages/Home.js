import React, { useRef, useEffect, useState } from 'react'
import Slider from 'react-slick'
import axios from 'axios'

import { CardPanel } from '../components/CardPanel'
import { HomeHeader } from '../components/HomeHeader'
import { HomeHero } from '../components/HomeHero'

export const Home = () => {
  const [state, setState] = useState({ loading: true })
  let sliderRef = useRef()

  useEffect(() => {
    axios
      .get(`/sc-districts/api/info-blocks`)
      .then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          setState({ loading: true })
          setState({ data: res.data, loading: false })
        }
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if (sliderRef) {
      timeout(state, sliderRef, setState)
    }

    return () => timeout(state, sliderRef, setState)
  }, [sliderRef, state, setState])

  return (
    <div className='home'>
      <HomeHeader />
      {!state.loading && (
        <Slider ref={sliderRef} {...settings}>
          {state.data.map((item) => {
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

const settings = {
  fade: true,
  slidesToShow: 1,
  lazyLoad: true,
  speed: 500,
  height: '100%',
  className: 'Body_card_wrapper',
}

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

const timeout = (state, ref, setState) => {
  let timer = 0
  state.data &&
    state.data.map(async (i, index) => {
      const arr = i.blocks.filter((i) => i['is-visible'])
      const delay = arr.length < 13 ? (arr.length <= 6 ? 6500 : 7500) : 8500
      timer = timer + arr.length * 3000 + delay

      if (index !== 7) {
        setTimeout(() => {
          ref.current.slickNext()
        }, timer)
      }

      await sleep(timer)
      if (index === 7) {
        setState({ loading: true })
        setState(state)
      }
    })
}
