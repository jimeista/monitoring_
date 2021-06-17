import React, { useEffect, useState, useMemo } from 'react'
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons'

import Card from './Card'

// карта панель из шести карточек
const CardPanel = ({ blocks, district }) => {
  const [classname, setClassname] = useState('')
  const [count, setCount] = useState(0) //активная панель для слайда по кнопкам

  // сброс состоянии при закрытии компоненты
  useEffect(() => {
    return () => {
      setClassname('')
      setCount(0)
    }
  }, [])

  // элемент панели слайда
  const slides = useMemo(() => {
    let arr = fillCard(blocks, district)
    arr = doubleCard(arr, district)

    return fillSlide(arr, district, classname).map((i, index) => (
      <div
        className={`cardpanel_slide ${classname}`}
        key={`cardpanel-slide-${district}-${index + 1}`}
      >
        {i}
      </div>
    ))
  }, [blocks, district, classname])

  // переход на пред панель 6-ти карточек
  const prev = (count) => {
    if (count - 1 >= 0) {
      setCount(count - 1)
      setClassname(`prev${count - 1}`)
    } else {
      if (blocks.length > 12) {
        setCount(2)
        setClassname(`next2`)
      }
      if (blocks.length > 6 && blocks.length <= 12) {
        setCount(1)
        setClassname('next1')
      }
    }
  }

  // переход на след панель 6-ти карточек
  const next = (count) => {
    if (blocks.length > 12) {
      if (count < 2) {
        setCount(count + 1)
        setClassname(`next${count + 1}`)
      } else {
        setCount(0)
        setClassname('prev0')
      }
    }
    if (blocks.length > 6 && blocks.length <= 12) {
      if (count + 1 < 2) {
        setCount(count + 1)
        setClassname(`next${count + 1}`)
      } else {
        setCount(0)
        setClassname('prev0')
      }
    }
  }

  return (
    <div className={'cardpanel'}>
      {/* слайды, максимум 3 слайда */}
      {slides.map((s) => s)}
      {/* кнопки переключения по слайдам */}
      <LeftCircleFilled
        className={'nav_icon left'}
        onClick={() => prev(count)}
      />
      <RightCircleFilled
        className={'nav_icon right'}
        onClick={() => next(count)}
      />
    </div>
  )
}

export default React.memo(CardPanel)

//создаем карточку для каждой категории
const fillCard = (data, district) => {
  return data.map((item, index) => {
    return Object.keys(item).length > 0 ? (
      <Card
        key={index}
        value={item.value}
        measurement={item.measurement}
        ru={item.ru}
        kz={item.kz}
        index={index + 1}
        length={data.length}
        cardId={item.id}
        district={district}
      />
    ) : (
      <div className='card card_style_main' />
    )
  })
}

//объединяем две карточки в одну колону
//это нужно чтобы в одной панели было 3 колонки
const doubleCard = (data, district) => {
  let arr = []

  // в зависимости количества карточек череда отображения в двойной строке панели меняется
  data.forEach((i, index) => {
    // пропускаем первый элемент
    if (index !== 0) {
      // проверка на количество карточек равное 9-ти
      if (data.length === 9) {
        if (index === 6 || index === 7 || index === 8) {
          arrPushSingle(arr, data, district, i, index)
        } else {
          let ind = (index + 1) % 2
          ind === 0 && arrPushDouble(arr, data, district, i, index)
        }
      }
      // проверка на количество карточек равное 15-ти
      else if (data.length === 15) {
        if (index === 12 || index === 13 || index === 14) {
          arrPushSingle(arr, data, district, i, index)
        } else {
          let ind = (index + 1) % 2
          ind === 0 && arrPushDouble(arr, data, district, i, index)
        }
      }
      // проверка на количество карточек равное ...
      else if (
        data.length === 2 ||
        data.length === 4 ||
        data.length === 8 ||
        data.length === 10 ||
        data.length === 14 ||
        data.length === 16
      ) {
        if (index + 2 === data.length || index + 1 === data.length) {
          arrPushSingle(arr, data, district, i, index)
        } else {
          let ind = (index + 1) % 2
          ind === 0 && arrPushDouble(arr, data, district, i, index)
        }
      } else {
        let ind = (index + 1) % 2
        ind === 0 && arrPushDouble(arr, data, district, i, index)
        index + 1 === data.length &&
          arrPushSingle(arr, data, district, i, index)
      }
    }
  })
  return arr
}

// заполняем панель слайда тремя колонами карточек
const fillSlide = (data) => {
  let arr = [] //конечная переменная панели слайда
  let arr_ = [] //временная переменная одного слайда, которая сбрасывается при заполнении слайда

  data.forEach((i, index) => {
    arr_.push(i) //заполняем один слайд пока условие не соответсвует для отрисовки
    if (index !== 0 && (index + 1) % 3 === 0) {
      // полная закраска слайда
      arr.push(arr_)
      arr_ = []
    }
    // закраска слайда оставшимися карточками
    if (index === data.length - 1 && (index + 1) % 3 !== 0) {
      arr.push(arr_)
    }
  })

  return arr
}

// колона с двумя карточками
const arrPushDouble = (arr, data, district, i, index) => {
  arr.push(
    <div className={'carddouble'} key={`carddouble-${district}-${index + 1}`}>
      {i}
      {data[index - 1]}
    </div>
  )
}

// колона с одной карточкой
const arrPushSingle = (arr, data, district, i, index) => {
  arr.push(
    <div className={'carddouble'} key={`carddouble-${district}-${index + 1}`}>
      {i}
    </div>
  )
}
