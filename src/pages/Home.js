import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Carousel, { Dots } from '@brainhubeu/react-carousel'

import CardPanel from '../components/CardPanel'
import HomeHeader from '../components/HomeHeader'
import HomeHero from '../components/HomeHero'

const Home = () => {
  const { home } = useSelector((state) => state.home)
  const [value, setValue] = useState(0)
  const [slides, setSlides] = useState([])

  useEffect(() => {
    if (home.status === 'success') {
      let arr = home.data.map((item) => {
        let blocks = item.blocks.filter((i) => i['is-visible'])
        return (
          <div className='carousel-wrapper' key={item.district}>
            <HomeHero
              data={{ date: item['last-edit'], title: item.district }}
            />
            <CardPanel blocks={blocks} district={item.district} />
          </div>
        )
      })
      setSlides(arr)
    }
  }, [home])

  const onchange = (val) => {
    setValue(val)
  }

  const carousel = useMemo(() => {
    return (
      <div className={'home-carousel'}>
        <Carousel
          value={value}
          slides={slides}
          onchange={onchange}
          draggable={false}
        />
        <Dots value={value} onChange={onchange} number={home.data.length} />
      </div>
    )
  }, [home, slides, value])

  return (
    <div className='home'>
      <HomeHeader />
      {carousel}
    </div>
  )
}

export default React.memo(Home)
