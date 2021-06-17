import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { getCookie } from '../../utils/auth'

export const getConfig = createAsyncThunk(
  'healthmodule/getConfig',
  async () => {
    const cookie = JSON.parse(getCookie('usertoken'))

    if (cookie) return { headers: cookie }
  }
)

//асинхронный get запрос по районам
export const getMonitoring = createAsyncThunk(
  'healthmodule/getMonitoring',
  async (ob) => {
    return await axios
      .get('/sc-api-gateway/secured/_/sc-districts/api/info-blocks', ob.config)
      .then((res) => res.data)
  }
)

//асинхронный get запрос по работе
export const getCoordinates = createAsyncThunk(
  'healthmodule/getCoordinates',
  async (ob) => {
    return await axios
      .get(
        `/sc-api-gateway/secured/_/sc-roadworks/api/roadworks?category=${checkCategory(
          ob.data.category
        )}&region=${ob.data.region}&year=2020`,
        ob.config
      )
      .then((res) => {
        localStorage.setItem(
          'coordinates',
          JSON.stringify({
            geometries: res.data,
          })
        )
        return res.data
      })
  }
)
const homeSlice = createSlice({
  name: 'home',
  initialState: {
    // слайды
    home: {
      data: [],
      status: 'idle',
      error: null,
    },
    // координаты на карту
    coordinates: {
      data: [],
      status: 'idle',
      error: null,
    },
    value: 0,
  },
  reducers: {
    // авторучная прокрутка слайдов по районам
    setDotValue: (state, action) => {
      let length = state.home.data.length

      if (action.payload === -1) {
        state.value = length - 1
      } else if (action.payload === length) {
        state.value = 0
      } else {
        state.value = action.payload
      }
    },
  },
  extraReducers: {
    //get запрос
    [getMonitoring.pending]: (state) => {
      state.home.status = 'loading'
    },
    [getMonitoring.fulfilled]: (state, action) => {
      state.home.status = 'success'
      state.home.data = action.payload
    },
    [getMonitoring.rejected]: (state, action) => {
      state.home.status = 'failed'
      state.home.error = action.payload
    },

    //get по работам
    [getCoordinates.pending]: (state) => {
      state.coordinates.status = 'loading'
    },
    [getCoordinates.fulfilled]: (state, action) => {
      state.coordinates.status = 'success'
      state.coordinates.data = action.payload
    },
    [getCoordinates.rejected]: (state, action) => {
      state.coordinates.status = 'failed'
      state.coordinates.error = action.payload
    },

    //get по работам
    [getConfig.pending]: (state) => {
      state.status = 'loading'
    },
    [getConfig.fulfilled]: (state, action) => {
      state.status = 'success'
      state.config = action.payload
    },
    [getConfig.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
  },
})

export const { setDotValue } = homeSlice.actions

export default homeSlice.reducer

// клиент сервер сверка найименовании категории работ
const checkCategory = (name) => {
  switch (name) {
    case 'Благоустройство дворов':
      return 'Капитальный ремонт дворов'
    case 'Строительство пешеходных тротуаров':
      return 'Реконструкция пешеходной зоны'
    case 'Строительство сетей водопровода и канализации':
      return 'Строительство и реконструкция канализации и водопровода'
    case 'Реконструкция арычных сетей':
      return 'Строительство и реконструкция арыков'
    case 'Строительство сетей газоснабжения':
      return 'Строительство и реконструкция газопровода'
    case 'Установка новых световых точек, опор наружного освещения':
      return 'Строительство линий наружного освещения'
    default:
      return name
  }
}
