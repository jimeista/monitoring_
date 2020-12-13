import React from 'react'
import { useDispatch } from 'react-redux'

import { getCoordinates } from '../features/home/homeSlice'

const Card = (props) => {
  const dispatch = useDispatch()

  const onClick = () => {
    if (categories.includes(props.ru)) {
      dispatch(getCoordinates({ region: props.district, category: props.ru }))
      localStorage.setItem(
        'block',
        JSON.stringify({
          ...props,
        })
      )
      window.open('/map')
    }
  }

  return (
    <div
      className={` active card card_style_main ${
        categories.includes(props.ru) && 'is_hover'
      }`}
      onClick={onClick}
      style={{ height: '50%' }}
    >
      <div id={'style_img' + props.cardId} className='img_p' />
      <div id={props.cardId}>
        <div className='card-row'>
          <span className='text_data_style'>DATA</span>
          <span className={'card-value'}>
            {props.value} {props.measurement}
          </span>
        </div>
        <div className='card-bordered' />
        <div className='card-row'>
          <span>RU</span>
          <div>{props.ru}</div>
        </div>
        <div className='card-bordered' />
        <div className='card-row'>
          <span>QZ</span>
          <div>{props.kz}</div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Card)

const categories = [
  'Благоустройство дворов',
  'Высадка деревьев',
  'Кол-во мест в детском саду введены в эксплуатацию',
  'Кол-во мест в школе введены в эксплуатацию',
  'Благоустройство парков и скверов',
  'Средний ремонт дорог',
  'Строительство пешеходных тротуаров',
  'Строительство сетей водопровода и канализации',
  'Строительство арычных сетей',
]
