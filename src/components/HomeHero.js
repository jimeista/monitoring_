import React from 'react'

export const HomeHero = (props) => {
  const date = props.data.date.split('-')

  return (
    <div className='home-hero'>
      <span>
        <div className='home-hero-date'>DATE</div>
        <div>
          {date[2]}.{date[1]}.{date[0]}
        </div>
      </span>
      <div className='home-hero-title'>{props.data.title}</div>
    </div>
  )
}
