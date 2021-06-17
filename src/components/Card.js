import React, {useCallback, useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

import {getCoordinates} from '../features/home/homeSlice'

//карточка обертка данных по данным района
const Card = (props) => {
  const dispatch = useDispatch()
  const {config} = useSelector(state => state.home)

  // открывает новое окно с картой
  // записывает данные карточки в локальную память
  const onClick = useCallback(() => {
    if(config){
      if (categories.includes(props.ru)) {
        dispatch(getCoordinates({data:{ region: props.district, category: props.ru }, config}))
        localStorage.setItem(
            'block',
            JSON.stringify({
              ...props,
            })
        )
      }
    }
  }, [props, dispatch , config])

  // обертка логики на переход на карту по районам и карточкам
  return useMemo(() => {
    // ограничение перехода по районам
    if (
        props.district === 'Медеуский район' ||
        props.district === 'Ауэзовский район'
    ) {
      // ограничение перехода по карточкам
      if (categories.includes(props.ru)) {
        return (
            <Link target='_blank' to='/map'>
              <div
                  className={` active card card_style_main ${
                      categories.includes(props.ru) && 'is_hover'
                  }`}
                  onClick={onClick}
                  style={{height: '50%'}}
              >
                <div id={'style_img' + props.cardId} className='img_p'/>
                <div id={props.cardId}>
                  <div className='card-row'>
                    <span className='text_data_style'>DATA</span>
                    <span className={'card-value'}>
                    {props.value} {props.measurement}
                  </span>
                  </div>
                  <div className='card-bordered'/>
                  <div className='card-row'>
                    <span>RU</span>
                    <div>{props.ru}</div>
                  </div>
                  <div className='card-bordered'/>
                  <div className='card-row'>
                    <span>QZ</span>
                    <div>{props.kz}</div>
                  </div>
                </div>
              </div>
            </Link>
        )
      } else {
        return (
            <div
                className={` active card card_style_main ${
                    categories.includes(props.ru) && 'is_hover'
                }`}
                onClick={onClick}
                style={{height: '50%'}}
            >
              <div id={'style_img' + props.cardId} className='img_p'/>
              <div id={props.cardId}>
                <div className='card-row'>
                  <span className='text_data_style'>DATA</span>
                  <span className={'card-value'}>
                  {props.value} {props.measurement}
                </span>
                </div>
                <div className='card-bordered'/>
                <div className='card-row'>
                  <span>RU</span>
                  <div>{props.ru}</div>
                </div>
                <div className='card-bordered'/>
                <div className='card-row'>
                  <span>QZ</span>
                  <div>{props.kz}</div>
                </div>
              </div>
            </div>
        )
      }
    } else {
      return (
          <div
              // className={` active card card_style_main ${categories.includes(props.ru) && 'is_hover'}`}
              className={` active card card_style_main`}
              onClick={onClick}
              style={{height: '50%'}}
          >
            <div id={'style_img' + props.cardId} className='img_p'/>
            <div id={props.cardId}>
              <div className='card-row'>
                <span className='text_data_style'>DATA</span>
                <span className={'card-value'}>
                {props.value} {props.measurement}
              </span>
              </div>
              <div className='card-bordered'/>
              <div className='card-row'>
                <span>RU</span>
                <div>{props.ru}</div>
              </div>
              <div className='card-bordered'/>
              <div className='card-row'>
                <span>QZ</span>
                <div>{props.kz}</div>
              </div>
            </div>
          </div>
      )
    }
  }, [onClick, props])
}

export default React.memo(Card)

// список карточек которые валидны для перехода на карту
const categories = [
  'Благоустройство дворов',
  'Высадка деревьев',
  'Кол-во мест в детском саду введены в эксплуатацию',
  'Кол-во мест в школе введены в эксплуатацию',
  'Благоустройство парков и скверов',
  'Средний ремонт дорог',
  'Строительство пешеходных тротуаров',
  // 'Строительство сетей водопровода и канализации',
  'Строительство сетей газоснабжения',
  'Установка новых световых точек, опор наружного освещения',
  'Реконструкция арычных сетей',
]
