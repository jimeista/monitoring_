import React from 'react'
import { useState } from 'react'
import CheckboxCategory from './CheckboxCategory'
import CheckboxYears from './CheckboxYears'
import DistrictStreet from './DistrictStreet'
import { ReactComponent as IconFilter } from '../assets/icons8-clear-filters-100.svg'
import YandexMaps from './YandexMaps'
import { useEffect } from 'react'
import Axios from 'axios'
var moment = require('moment')

function MMap(props) {
  const [reset, setReset] = useState(false)
  const [periodVisible, setPeriodVisible] = useState(false)

  const [initialDistrict, setInitialDistrict] = useState()
  const [initialCategory, setInitialCategory] = useState()
  const [initialYear, setInitialYear] = useState()

  const [initialMapData, setInitialMapData] = useState([])
  const [data, setData] = useState([])

  const [checkedDistricts, setCheckedDistricts] = useState([])
  const [checkedCategories, setCheckedCategories] = useState([])
  const [checkedYears, setCheckedYears] = useState(null)

  const [selectedCategory, setSelectedCategory] = useState([])
  const [selectedDates, setSelectedDates] = useState(2020)
  const [selectedDistrict, setSelectedDistrict] = useState([])

  const [mapdata, setMapData] = useState([])
  const [selectedResponsible, setSelectedResponsible] = useState([])
  const [years, setYears] = useState([2019, 2020, 2021])
  const [mapData_, setMapData_] = useState(null)
  const [mapState, setMapState] = useState({
    center: [43.2405018, 76.9213614, 12],
    zoom: 12,
  })

  const [isL, setIsL] = useState(false)

  useEffect(() => {
    let block = JSON.parse(localStorage.getItem('block'))
    let coordinates = JSON.parse(localStorage.getItem('coordinates'))
    let yyyy = moment(
      coordinates?.geometries.length > 0
        ? coordinates?.geometries[0]['start-date']
        : moment(moment().format('YYYY'), 'YYYY').format('YYYY'),
      'YYYY-MM-DD'
    ).format('YYYY')

    let dddd = block.district
    let cccc = block.ru

    setInitialCategory(cccc)
    setInitialYear(yyyy)
    setInitialDistrict(dddd)

    setSelectedDistrict([dddd])
    setSelectedCategory([cccc])
    getCard(yyyy, dddd, checkCategory(cccc))
  }, [])

  function getCard(yyyy, dddd, cccc) {
    Axios.get(
      `/sc-roadworks/api/roadworks?year=${yyyy}${
        dddd ? `&region=${dddd}` : ''
      }${cccc ? `&category=${cccc}` : ''}`
    ).then((result) => {
      let mapdt = coordinatesToMapData(
        addColor(
          filterByCheckedDistricts(
            filterByCategories(result.data),
            checkedDistricts.length > 0
              ? checkedDistricts
              : initialDistrict
              ? [initialDistrict]
              : []
          )
        )
      )
      setInitialMapData(mapdt)
      setMapData(mapdt)

      let tttt = filterByCheckedDistricts(
        filterByCheckedCategories(
          filterByCategories(result.data),
          cccc
            ? cccc
            : checkedCategories.length > 0
            ? checkedCategories
            : initialCategory
            ? [initialCategory]
            : []
        ),
        dddd
      )

      setSelectedResponsible(
        tttt.reduce((organisations, organisation) => {
          organisation.organisation = organisation.organisation.includes(
            'Акимат'
          )
            ? 'Акимат'
            : organisation.organisation
          if (
            organisations.filter(
              (el) => el.organisation === organisation.organisation
            ).length > 0
          ) {
            return organisations
          } else {
            return [...organisations, organisation]
          }
        }, [])
      )
      setData(addColor(tttt))
    })
  }

  function filterByCategories(data) {
    return data.filter((el) => isValidCategory(el.category))
  }

  function isValidCategory(category) {
    return [
      'Капитальный ремонт дворов',
      'Высадка деревьев',
      'Кол-во мест в детских садах',
      'Кол-во мест в школах',
      'Благоустройство парков и скверов',
      'Средний ремонт дорог',
      'Капитальный ремонт пешеходной зоны',
      'Строительство и реконструкция водопровода и канализации',
      'Строительство и реконструкция арыков',
    ].includes(category)
  }

  function addColor(data) {
    return data.map((el) => {
      let color = el.organisation.includes('Акимат')
        ? '#851DA7'
        : el.organisation.includes('УГМ')
        ? '#DC2B1F'
        : el.organisation.includes('АлматыСу')
        ? '#6CD7C9'
        : el.organisation.includes('АлТС')
        ? '#610035'
        : el.organisation.includes('УКГС')
        ? '#5EE83C'
        : el.organisation.includes('УЗЭ')
        ? '#2722EF'
        : el.organisation.includes('КазТрансГаз')
        ? '#FF54D8'
        : '#045A2B'
      return {
        ...el,
        color: color,
      }
    })
  }

  function getCard2({ disricts, dates, categories }) {
    setIsL(false)
    Axios.get(
      `/sc-roadworks/api/roadworks?${dates ? 'year=' : ''}${parseInt(
        dates ?? moment().format('YYYY')
      )}`
    ).then((result) => {
      console.log(result)

      let mapdt = coordinatesToMapData(
        addColor(
          filterByCheckedDistricts(
            filterByCheckedCategories(
              filterByCategories(result.data),
              categories
                ? categories
                : checkedCategories.length > 0
                ? checkedCategories
                : initialCategory
                ? [initialCategory]
                : []
            ),
            disricts
              ? disricts
              : checkedDistricts.length > 0
              ? checkedDistricts
              : initialDistrict
              ? [initialDistrict]
              : []
          )
        )
      )
      setInitialMapData(mapdt)
      setMapData(mapdt)
      let tttt = filterByCheckedDistricts(
        filterByCheckedCategories(
          filterByCategories(result.data),
          categories
            ? categories
            : checkedCategories.length > 0
            ? checkedCategories
            : initialCategory
            ? [initialCategory]
            : []
        ),
        disricts
          ? disricts
          : checkedDistricts.length > 0
          ? checkedDistricts
          : initialDistrict
          ? [initialDistrict]
          : []
      )

      setSelectedResponsible(
        tttt.reduce((organisations, organisation) => {
          organisation.organisation = organisation.organisation.includes(
            'Акимат'
          )
            ? 'Акимат'
            : organisation.organisation
          if (
            organisations.filter(
              (el) => el.organisation === organisation.organisation
            ).length > 0
          ) {
            return organisations
          } else {
            return [...organisations, organisation]
          }
        }, [])
      )
      setIsL(true)
      setData(addColor(tttt))
    })
  }

  function filterByCheckedCategories(data, categories) {
    return data.filter((el) =>
      categories?.length > 0 ? categories.includes(el.category) : true
    )
  }

  function filterByCheckedDistricts(data, disctricts) {
    console.log(disctricts)
    return data.filter((el) =>
      disctricts?.length > 0 ? disctricts.includes(el.region) : true
    )
  }

  function coordinatesToMapData(mapdata) {
    return mapdata
      ?.filter((el) => el.geometries.coordinates[0])
      ?.map((el, index) => ({
        type: 'Feature',
        id: index,
        organisation: el.organisation,
        geometry: {
          type: 'LineString',
          coordinates: el.geometries.coordinates[0],
        },
        properties: {
          balloonContent: `
        <div>
          <div><b>Начало работы :</b> ${el['start-date']}</div>
          <div><b>Завершение работы :</b> ${el['end-date']}</div>
          <div><b>Район :</b> ${el['region']}</div>
          <div><b>Категория работы :</b> ${el['category']}</div>
          <div><b>Ответсвенный :</b> ${el['organisation']}</div>
          <div><b>Исполнитель :</b> ${el['contractor'] ?? 'Не определен'} </div>
          <div><b>Вскрытие работ :</b> ${
            el['is-canvas-opened'] ? 'Да' : 'Нет'
          }</div>
          <div><b>Перекрытие улиц :</b> ${
            el['is-closured'] ? 'Да' : 'Нет'
          }</div>
          <div><b>Статус :</b> ${el.status.percentage}</div>
        </div>
      `,
        },
        options: {
          // Курсор в режиме добавления новых вершин.
          editorDrawingCursor: 'crosshair',
          // Цвет заливки.
          fillColor: el.color ?? '#851DA7',
          fillOpacity: 0.5,
          strokeColor: el.color ?? '#851DA7',
          strokeWidth: 5,
        },
      }))
  }

  useEffect(() => {
    isL &&
      setMapData(
        initialMapData.filter((el) =>
          selectedResponsible.includes(
            el.organisation.includes('Акимат') ? 'Акимат' : el.organisation
          )
        )
      )
  }, [selectedResponsible])

  function resetAll() {
    setReset()
    setCheckedYears(null)
    setCheckedDistricts([])
    setCheckedCategories([])
    getCard(initialYear, initialDistrict, initialCategory)
  }

  return (
    <div className='RoadWorks_main'>
      <div className='RoadWorks_wrapper'>
        <div className='RoadWorks_title_wrap'>
          <span className='RoadWorks_title'>Информация по районам</span>
        </div>

        <div className='RoadWorks_filter'>
          <div className='RoadWorks_filter_filter'>
            <div className='RoadWorks_filter_item'>
              <CheckboxYears
                titleBtn={checkedYears ?? initialYear ?? 'Временной период'}
                dateP={'dateP'}
                newVisible={periodVisible}
                setVisible={setPeriodVisible}
                years={years}
                checkedYears={checkedYears}
                setYears={setYears}
                selectedDates={selectedDates}
                setSelectedDates={setSelectedDates}
                selectedCategory={selectedCategory}
                selectedDistrict={selectedDistrict}
                setCheckedYears={setCheckedYears}
                getCard={getCard2}
              />
            </div>
            <div className='RoadWorks_filter_item'>
              <DistrictStreet
                reset={reset}
                setReset={setReset}
                titleBtn={
                  checkedDistricts.length > 0
                    ? 'Районы'
                    : initialDistrict ?? 'Районы'
                }
                getCard={getCard2}
                selectedDistrict={selectedDistrict}
                checkedYears={checkedYears}
                setSelectedDistrict={setSelectedDistrict}
                checkedDistricts={checkedDistricts}
                initialDistrict={initialDistrict}
                setCheckedDistricts={setCheckedDistricts}
              />
            </div>
            <div className='RoadWorks_filter_item'>
              <CheckboxCategory
                reset={reset}
                setReset={setReset}
                titleBtn={
                  checkedCategories.length > 0
                    ? 'Категория работ'
                    : initialCategory ?? 'Категория работ'
                }
                search={true}
                getCard={getCard2}
                initialCategory={initialCategory}
                checkedYears={checkedYears ?? moment().format('YYYY')}
                checkedDistricts={checkedDistricts}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setPeriodVisible={setPeriodVisible}
                checkedCategories={checkedCategories}
                large={checkedCategories.length > 0 ? false : true}
                setCheckedCategories={setCheckedCategories}
                initialDistricts={initialDistrict}
              />
            </div>
            <div
              className='RoadWorks_filter_item'
              style={{
                display: `${
                  checkedDistricts?.length > 0 ||
                  checkedYears?.length > 0 ||
                  checkedCategories?.length > 0
                    ? 'flex'
                    : 'none'
                }`,
              }}
            >
              <div
                className='RoadWorks_filter_item_filter_buttons clear_filter '
                onClick={() => {
                  resetAll()
                }}
              >
                <IconFilter style={{ height: '100%' }} />
              </div>
            </div>
          </div>
        </div>
        <div id='map_block' className={`RoadWorks_body map_block active`}>
          <div className='legendForMap_roadWorks'>
            {data
              .reduce((organisations, organisation) => {
                organisation.organisation = organisation.organisation.includes(
                  'Акимат'
                )
                  ? 'Акимат'
                  : organisation.organisation
                if (
                  organisations.filter(
                    (el) => el.organisation === organisation.organisation
                  ).length > 0
                ) {
                  return organisations
                } else {
                  return [...organisations, organisation]
                }
              }, [])
              .map((el, index) => {
                return (
                  <div
                    key={index}
                    className={`legendForMap_wrap ${
                      selectedResponsible[
                        data
                          .reduce((organisations, organisation) => {
                            organisation.organisation = organisation.organisation.includes(
                              'Акимат'
                            )
                              ? 'Акимат'
                              : organisation.organisation
                            if (
                              organisations.filter(
                                (el) => el === organisation.organisation
                              ).length > 0
                            ) {
                              return organisations
                            } else {
                              return [...organisations, organisation]
                            }
                          }, [])
                          .map((el) => el)
                          .indexOf(el)
                      ] === el.organisation
                        ? 'active'
                        : ''
                    } `}
                    onClick={() => {
                      let temp = selectedResponsible
                      if (temp.includes(el.organisation))
                        temp[
                          data
                            .reduce((organisations, organisation) => {
                              organisation.organisation = organisation.organisation.includes(
                                'Акимат'
                              )
                                ? 'Акимат'
                                : organisation.organisation
                              if (
                                organisations.filter(
                                  (el) =>
                                    el.organisation ===
                                    organisation.organisation
                                ).length > 0
                              ) {
                                return organisations
                              } else {
                                return [...organisations, organisation]
                              }
                            }, [])
                            .map((el) => el)
                            .indexOf(el)
                        ] = ''
                      else
                        temp[
                          data
                            .reduce((organisations, organisation) => {
                              organisation.organisation = organisation.organisation.includes(
                                'Акимат'
                              )
                                ? 'Акимат'
                                : organisation.organisation
                              if (
                                organisations.filter(
                                  (el) =>
                                    el.organisation ===
                                    organisation.organisation
                                ).length > 0
                              ) {
                                return organisations
                              } else {
                                return [...organisations, organisation]
                              }
                            }, [])
                            .map((el) => el)
                            .indexOf(el)
                        ] = el.organisation

                      setSelectedResponsible([...temp])
                    }}
                  >
                    <span
                      className='legendForMap_color purple'
                      style={{ background: `${el.color}` }}
                    />
                    <span title={el.fullName} className='legendForMap_text'>
                      {el.organisation}
                    </span>
                  </div>
                )
              })}
          </div>
          <YandexMaps
            mapData_={mapdata}
            mapState={mapState}
            mapdata={props.mapData ?? []}
            data={props.schools ?? []}
          />
        </div>
      </div>
    </div>
  )
}

const checkCategory = (name) => {
  switch (name) {
    case 'Благоустройство дворов':
      return 'Капитальный ремонт дворов'
    case 'Кол-во мест в детском саду введены в эксплуатацию':
      return 'Строительство и реконструкция садиков'
    case 'Кол-во мест в школе введены в эксплуатацию':
      return 'Строительство и реконструкция школ'
    case 'Строительство пешеходных тротуаров':
      return 'Реконструкция пешеходной зоны'
    case 'Строительство сетей водопровода и канализации':
      return 'Строительство и реконструкция канализации и водопровода'
    case 'Строительство арычных сетей':
      return 'Строительство и реконструкция арыков'
    case 'Установка новых световых точек, опор наружного освещения':
      return 'Строительство линий наружного освещения'
    default:
      return name
  }
}

export default MMap
