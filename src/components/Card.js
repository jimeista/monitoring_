import React, { useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'

const Card = (props) => {
  const onClick = useCallback(() => {
    if (
      props.district === 'Медеуский район' ||
      props.district === 'Ауэзовский район'
    ) {
      if (categories.includes(props.ru)) {
        let popup = window.open('/map')
        popup.postMessage(
          {
            district: props.district,
            category: props.ru,
          },
          'https://sc.smartalmaty.kz'
        )
      }
    }
  }, [props])

  const wrappercard = useMemo(() => {
    if (
      props.district === 'Медеуский район' ||
      props.district === 'Ауэзовский район'
    ) {
      if (categories.includes(props.ru)) {
        console.log(props)
        return (
          // <Link
          //   target='_blank'
          //   // to={{
          //   //   pathname: '/map',
          //   //   query: { district: props.district, category: props.ru },
          //   // }}
          //   to={'/map'}
          //   state={{ district: props.district, category: props.ru }}
          // >
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
          // {/* </Link> */}
        )
      } else {
        return (
          <div
            className={` active card card_style_main ${
              categories.includes(props.ru) && 'is_hover'
            }`}
            // onClick={onClick}
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
    } else {
      return (
        <div
          // className={` active card card_style_main ${categories.includes(props.ru) && 'is_hover'}`}
          className={` active card card_style_main`}
          // onClick={onClick}
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
  }, [onClick, props])

  return wrappercard
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
