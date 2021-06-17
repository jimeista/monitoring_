import React from 'react'

import logo1 from '../assets/logo1.svg'
import logo2 from '../assets/logo2.svg'
import logo3 from '../assets/logo3.svg'

// шапка с логотипами
const HomeHeader = () => {
  return (
    <div className='home-header'>
      <>
        <img src={logo1} alt='logo-1' />
      </>
      <>
        <img src={logo2} alt='logo-2' />
      </>
      <>
        <img src={logo3} alt='logo-3' />
      </>
    </div>
  )
}

export default React.memo(HomeHeader)
