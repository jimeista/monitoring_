import React, { useMemo } from 'react'
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons'

import Card from './Card'

const CardPanel = ({ blocks, district }) => {
  const slides = useMemo(() => {
    let arr = fillCard(blocks, district)
    arr = doubleCard(arr, district)
    return fillSlide(arr, district).map((i, index) => (
      <div
        className={`cardpanel_slide`}
        key={`cardpanel-slide-${district}-${index + 1}`}
      >
        {i}
        <input
          type='radio'
          name='radio-left'
          id={`slide-control-${index}`}
          className={'left'}
        />
        <a href='#st-panel-2' className={'left'}>
          <LeftCircleFilled className={'icon'} />
        </a>

        <input
          type='radio'
          name='radio-right'
          id={`slide-control-${index === arr.length - 1 ? 0 : index + 1}`}
          className={'right'}
        />
        <a href='#st-panel-2' className={'right'}>
          <RightCircleFilled className={'icon'} />
        </a>
      </div>
    ))
  }, [blocks, district])

  return (
    <div className={'cardpanel'}>
      {slides.map((s) => s)}
      {/* <LeftCircleFilled className={'nav_icon left'} />
      <RightCircleFilled className={'nav_icon right'} /> */}
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

//fill slide on double row
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

//prep slides to scroll
const fillSlide = (data) => {
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
