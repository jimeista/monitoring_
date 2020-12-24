import React from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons'

import { setDotValue } from '../features/home/homeSlice'

const HomeHero = (props) => {
  const ob = districts.find((item) => item.title === props.data.title)
  const moment_ = moment().format('DD-MM-YYYY')

  const { value } = useSelector((state) => state.home)
  const dispatch = useDispatch()

  return (
    <div className='home-hero'>
      <div className='home-hero_inner'>
        <div className='home-hero-date_num'>{`${moment_}`}</div>
      </div>
      <div className='home-hero-title'>
        <LeftCircleFilled
          className={'nav_icon_dots left_dots'}
          onClick={() => {
            dispatch(setDotValue(value - 1))
          }}
        />
        {ob.value}
        <RightCircleFilled
          className={'nav_icon_dots right_dots'}
          onClick={() => {
            dispatch(setDotValue(value + 1))
          }}
        />
      </div>
    </div>
  )
}

export default React.memo(HomeHero)

const districts = [
  { title: 'Алатауский район', value: 'Алатау ауданы / Алатауский район' },
  { title: 'Алмалинский район', value: 'Алмалы ауданы / Алмалинский район' },
  { title: 'Ауэзовский район', value: 'Ауэзов ауданы  / Ауэзовский район' },
  {
    title: 'Бостандыкский район',
    value: 'Бостандык ауданы / Бостандыкский район',
  },
  { title: 'Жетысуский район', value: 'Жетысу ауданы / Жетысуский район' },
  { title: 'Медеуский район', value: 'Медеу ауданы / Медеуский район' },
  {
    title: 'Наурызбайский район',
    value: 'Наурызбай ауданы / Наурызбайский район',
  },
  { title: 'Турксибский район', value: 'Турксиб ауданы / Турксибский район' },
]
