import React from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons'

import { setDotValue } from '../features/home/homeSlice'

// заголовок района
const HomeHero = (props) => {
  const ob = districts.find((item) => item.title === props.data.title) //находим нужный район

  const { value } = useSelector((state) => state.home) //состояние активного слайда при переключении
  const dispatch = useDispatch()

  return (
    <div className='home-hero'>
      {/* актуальная дата */}
      <div className='home-hero_inner'>
        <div className='home-hero-date_num'>
          {moment().format('DD-MM-YYYY')}
        </div>
      </div>
      {/* заголовок с кнопками переключения*/}
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

// дополнение к названию районов на двух языках для заголовка района
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
