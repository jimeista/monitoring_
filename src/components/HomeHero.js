import React from 'react'

export const HomeHero = (props) => {
  const date = props.data.date.split('-')

  const ob = districts.find((item) => item.title === props.data.title)

  return (
    <div className='home-hero'>
      <div className='home-hero_inner'>
        <div className='home-hero-date_text'>DATE</div>
        <div className='home-hero-date_num'>
          {date[2]}.{date[1]}.{date[0]}
        </div>
      </div>
      <div className='home-hero-title'>{ob.value}</div>
    </div>
  )
}

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
