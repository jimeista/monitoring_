import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getMonitoring = createAsyncThunk(
  'healthmodule/getMonitoring',
  async () => {
    return await axios
      .get('/sc-districts/api/info-blocks')
      .then((res) => res.data)
  }
)

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    home: {
      data: [],
      status: 'idle',
      error: null,
    },
  },
  reducers: {},
  extraReducers: {
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
  },
})

// export const {} = homeSlice.actions

export default homeSlice.reducer
