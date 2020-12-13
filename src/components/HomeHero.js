import React from 'react'
import moment from 'moment'

const HomeHero = (props) => {
  const ob = districts.find((item) => item.title === props.data.title)

  const moment_ = moment().format('DD-MM-YYYY')

  return (
    <div className='home-hero'>
      <div className='home-hero_inner'>
        <div className='home-hero-date_num'>{`${moment_}`}</div>
      </div>
      <div className='home-hero-title'>{ob.value}</div>
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
