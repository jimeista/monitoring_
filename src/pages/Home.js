import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Carousel, { Dots } from '@brainhubeu/react-carousel'

import { setDotValue } from '../features/home/homeSlice'

import CardPanel from '../components/CardPanel'
import HomeHeader from '../components/HomeHeader'
import HomeHero from '../components/HomeHero'

const Home = () => {
  const { home, value } = useSelector((state) => state.home)
  const [slides, setSlides] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    if (home.status === 'success') {
      let auez = home.data.find((i) => i.district === 'Ауэзовский район')
      let medeu = home.data.find((i) => i.district === 'Медеуский район')

      let arr = home.data.filter(
        (i) =>
          i.district !== 'Ауэзовский район' && i.district !== 'Медеуский район'
      )

      arr = [auez, medeu, ...arr]

      arr = arr.map((item) => {
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

  const onchange = useCallback(
    (val) => {
      dispatch(setDotValue(val))
    },
    [dispatch]
  )

  const carousel = useMemo(() => {
    return (
      <div className={'home-carousel'}>
        <Carousel
          value={value}
          slides={slides}
          onchange={onchange}
          draggable={false}
          plugins={['arrows']}
        />
        <Dots value={value} onChange={onchange} number={home.data.length} />
      </div>
    )
  }, [home, slides, value, onchange])

  return (
    <div className='home'>
      <HomeHeader />
      {carousel}
    </div>
  )
}

export default React.memo(Home)
