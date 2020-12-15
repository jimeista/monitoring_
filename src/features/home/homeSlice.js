import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMonitoring = createAsyncThunk(
 "healthmodule/getMonitoring",
 async () => {
  return await axios
   .get("/sc-districts/api/info-blocks")
   .then((res) => res.data);
 }
);

export const getCoordinates = createAsyncThunk(
 "healthmodule/getCoordinates",
 async (data) => {
  return await axios
   .get(
    `/sc-roadworks/api/roadworks?category=${checkCategory(
     data.category
    )}&region=${data.region}&year=2020`
   )
   .then((res) => {
    console.log(res, data);
    localStorage.setItem(
     "coordinates",
     JSON.stringify({
      geometries: res.data,
     })
    );
    return res.data;
   });
 }
);

const homeSlice = createSlice({
 name: "home",
 initialState: {
  home: {
   data: [],
   status: "idle",
   error: null,
  },
  coordinates: {
   data: [],
   status: "idle",
   error: null,
  },
 },
 reducers: {},
 extraReducers: {
  //get monitoring data
  [getMonitoring.pending]: (state) => {
   state.home.status = "loading";
  },
  [getMonitoring.fulfilled]: (state, action) => {
   state.home.status = "success";
   state.home.data = action.payload;
  },
  [getMonitoring.rejected]: (state, action) => {
   state.home.status = "failed";
   state.home.error = action.payload;
  },

  //get coordinates data
  [getCoordinates.pending]: (state) => {
   state.coordinates.status = "loading";
  },
  [getCoordinates.fulfilled]: (state, action) => {
   state.coordinates.status = "success";
   state.coordinates.data = action.payload;
  },
  [getCoordinates.rejected]: (state, action) => {
   state.coordinates.status = "failed";
   state.coordinates.error = action.payload;
  },
 },
});

// export const {} = homeSlice.actions

export default homeSlice.reducer;

const checkCategory = (name) => {
 switch (name) {
  case "Благоустройство дворов":
   return "Капитальный ремонт дворов";
  case "Строительство пешеходных тротуаров":
   return "Реконструкция пешеходной зоны";
  case "Строительство сетей водопровода и канализации":
   return "Строительство и реконструкция канализации и водопровода";
  case "Строительство арычных сетей":
   return "Строительство и реконструкция арыков";
  default:
   return name;
 }
};
