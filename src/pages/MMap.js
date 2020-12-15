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

  const [data, setData] = useState()

  const [checkedDistricts, setCheckedDistricts] = useState([])
  const [checkedCategories, setCheckedCategories] = useState([])
  const [checkedYears, setCheckedYears] = useState([])

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedDates, setSelectedDates] = useState(2020)
  const [selectedDistrict, setSelectedDistrict] = useState(null)

  const [mapdata, setMapData] = useState([])

  const [years, setYears] = useState([2019, 2020, 2021])
  const [mapData_, setMapData_] = useState(null)
  const [mapState, setMapState] = useState({
    center: [43.2405018, 76.9213614, 13],
    zoom: 15,
  })

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

    Axios.get(
      `/sc-roadworks/api/roadworks?category=${block.ru}&district=${block.district}&year=2020`
    ).then((res) => {
      setMapData(coordinatesToMapData(res.data))
    })

    setInitialCategory(cccc)
    setInitialYear(yyyy)
    setInitialDistrict(dddd)

    getCard(yyyy, dddd, cccc)
  }, [])

  function getCard(yyyy, dddd, cccc) {
    Axios.get(
      `sc-roadworks/api/roadworks?year=${yyyy}${
        dddd ? `&district=${dddd}` : ''
      }${cccc ? `&category=${cccc}` : ''}`
    ).then((result) => {
      setMapData(coordinatesToMapData(filterByCategories(result.data)))
      setData(filterByCategories(result.data))
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

  function getCard2({ disricts, dates, initialCategory }) {
    Axios.get(`sc-roadworks/api/roadworks?${dates ? 'year' : ''}${dates}`).then(
      (result) => {
        setMapData(
          coordinatesToMapData(
            filterByCheckedDistricts(
              filterByCheckedCategories(filterByCategories(result.data))
            )
          )
        )
        setData(
          filterByCheckedDistricts(
            filterByCheckedCategories(filterByCategories(result.data))
          )
        )
      }
    )
  }

  function filterByCheckedCategories(data) {
    return data.filter((el) =>
      checkedCategories?.length > 0
        ? checkedCategories.includes(el.category)
        : true
    )
  }

  function filterByCheckedDistricts(data) {
    return data.filter((el) =>
      checkedDistricts?.length > 0 ? checkedDistricts.includes(el.region) : true
    )
  }

  function coordinatesToMapData(mapdata) {
    return mapdata
      ?.filter((el) => el.geometries.coordinates[0])
      ?.map((el, index) => ({
        type: 'Feature',
        id: index,
        geometry: {
          type: 'LineString',
          coordinates: el.geometries.coordinates[0],
        },
        properties: {
          balloonContent: `
             <div>
               
             </div>
           `,
          clusterCaption: `TTTT`,
        },
        options: {
          // Курсор в режиме добавления новых вершин.
          editorDrawingCursor: 'crosshair',
          // Цвет заливки.
          fillColor: '#851DA7',
          fillOpacity: 0.5,
          strokeColor: '#851DA7',
          strokeWidth: 5,
        },
      }))
  }

  useEffect(() => {
    ;(checkedCategories?.length > 0 || checkedDistricts?.length > 0) &&
      getCard2({ disricts: checkedDistricts, dates: checkedYears })
  }, [checkedCategories, checkedDistricts])

  function resetAll() {
    setCheckedYears(null)
    setCheckedDistricts([])
    setCheckedCategories([])
    getCard(initialYear, initialDistrict, initialCategory)
  }

  return (
    <div className='RoadWorks_main'>
      <div className='RoadWorks_wrapper'>
        <div className='RoadWorks_title_wrap'>
          <span className='RoadWorks_title'>Информация по детским садам</span>
        </div>

        <div className='RoadWorks_filter'>
          <div className='RoadWorks_filter_filter'>
            <div className='RoadWorks_filter_item'>
              <CheckboxYears
                titleBtn={'Временной период'}
                dateP={'dateP'}
                newVisible={periodVisible}
                setVisible={setPeriodVisible}
                years={years}
                setYears={setYears}
                selectedDates={selectedDates}
                setSelectedDates={setSelectedDates}
                selectedCategory={selectedCategory}
                selectedDistrict={selectedDistrict}
                getCard={getCard}
              />
            </div>
            <div className='RoadWorks_filter_item'>
              <DistrictStreet
                reset={reset}
                setReset={setReset}
                titleBtn={'Район'}
                getCard={getCard}
                selectedDistrict={selectedDistrict}
                setSelectedDistrict={setSelectedDistrict}
                checkedDistricts={checkedDistricts}
                setCheckedDistricts={setCheckedDistricts}
              />
            </div>
            <div className='RoadWorks_filter_item'>
              <CheckboxCategory
                reset={reset}
                setReset={setReset}
                titleBtn={'Категория работ'}
                search={true}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setPeriodVisible={setPeriodVisible}
                checkedCategories={checkedCategories}
                large={true}
                setCheckedCategories={setCheckedCategories}
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

export default MMap
