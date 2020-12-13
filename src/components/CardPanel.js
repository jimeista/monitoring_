import React, { useEffect, useState, useMemo } from 'react'
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons'

import Card from './Card'

const CardPanel = ({ blocks, district }) => {
  const [classname, setClassname] = useState('')
  const [count, setCount] = useState(0)

  useEffect(() => {
    return () => {
      setClassname('')
      setCount(0)
    }
  }, [])

  const slides = useMemo(() => {
    let arr = fillCard(blocks, district)
    arr = doubleCard(arr, district)
    return fillSlide(arr, district, classname).map((i, index) => (
      <div
        className={`cardpanel_slide ${classname}`}
        key={`cardpanel-slide-${district}-${index + 1}`}
      >
        {i}
      </div>
    ))
  }, [blocks, district, classname])

  const prev = (count) => {
    if (count - 1 >= 0) {
      setCount(count - 1)
      setClassname(`prev${count - 1}`)
    } else {
      if (blocks.length > 12) {
        setCount(2)
        setClassname(`next2`)
      }
      if (blocks.length > 6 && blocks.length <= 12) {
        setCount(1)
        setClassname('next1')
      }
    }
  }

  const next = (count) => {
    if (blocks.length > 12) {
      if (count < 2) {
        setCount(count + 1)
        setClassname(`next${count + 1}`)
      } else {
        setCount(0)
        setClassname('prev0')
      }
    }
    if (blocks.length > 6 && blocks.length <= 12) {
      if (count + 1 < 2) {
        setCount(count + 1)
        setClassname(`next${count + 1}`)
      } else {
        setCount(0)
        setClassname('prev0')
      }
    }
  }

  return (
    <div className={'cardpanel'}>
      {slides.map((s) => s)}
      <LeftCircleFilled
        className={'nav_icon left'}
        onClick={() => prev(count)}
        // disabled={count === 0}
      />
      <RightCircleFilled
        className={'nav_icon right'}
        onClick={() => next(count)}
        // disabled={
        //   (blocks.length > 12 && count === 2) ||
        //   blocks.length < 7 ||
        //   (blocks.length < 13 && count === 1)
        // }
      />
    </div>
  )
}

export default React.memo(CardPanel)

//fill each data into card
const fillCard = (data, district) => {
  return data.map((item, index) => {
    return Object.keys(item).length > 0 ? (
      <Card
        key={index}
        value={item.value}
        measurement={item.measurement}
        ru={item.ru}
        kz={item.kz}
        index={index + 1}
        length={data.length}
        cardId={item.id}
        district={district}
      />
    ) : (
      <div className='card card_style_main' />
    )
  })
}

//display two rows in a div
const doubleCard = (data, district) => {
  let arr = []

  data.forEach((i, index) => {
    if (index !== 0 && (index + 1) % 2 === 0) {
      arr.push(
        <div
          className={'carddouble'}
          key={`carddouble-${district}-${index + 1}`}
        >
          {i}
          {data[index - 1]}
        </div>
      )
    }
    if (data.length % 2 === 1 && index === data.length - 1) {
      arr.push(
        <div
          className={'carddouble'}
          key={`carddouble-${district}-${index + 1}`}
        >
          {i}
        </div>
      )
    }
  })
  return arr
}

const fillSlide = (data, district, classname) => {
  let arr = []
  let arr_ = []

  data.forEach((i, index) => {
    arr_.push(i)
    if (index !== 0 && (index + 1) % 3 === 0) {
      arr.push(arr_)
      arr_ = []
    }
    if (index === data.length - 1 && (index + 1) % 3 !== 0) {
      arr.push(arr_)
    }
  })

  return arr
}
