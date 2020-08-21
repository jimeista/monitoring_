import React from 'react'

export const HomeHero = (props) => {
  return (
    <div className='home-hero'>
      {props.date}
      {props.district}
    </div>
  )
}
