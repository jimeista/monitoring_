import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { CardPanel } from '../components/CardPanel'
import { HomeHeader } from '../components/HomeHeader'
import { HomeHero } from '../components/HomeHero'

export const Home = () => {
  const [state, setState] = useState({ loading: true })

  useEffect(() => {
    axios
      .get(`/sc-districts/api/info-blocks`)
      .then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          setState({ data: res.data, loading: false })
        }
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div>
      <HomeHeader />
      <>
        <HomeHero
          data={{
            date: state.data ? state.data[0]['last-edit'] : '08-21-2020',
            title: state.data ? state.data[0].district : 'Алатауский район',
          }}
        />
        <div className='home-card-panel'>
          {!state.loading && <CardPanel blocks={state.data[0].blocks} />}
        </div>
      </>
    </div>
  )
}
