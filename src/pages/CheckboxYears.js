import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Button, Input, Typography, Checkbox } from "antd";
import { DownOutlined } from "@ant-design/icons";
// import {
//   setSelectedDistrictsAndStreets,
//   setFilterValue,
//   setSelectedDate,
// } from "../redux/actions";
import { connect } from "react-redux";
import Axios from "axios";
// import { FILTER_CRIMES_DATA, FILTER_ACCIDENTS_DATA } from "../redux/types";
var moment = require("moment");
const jp = require("jsonpath");

/** Выпадашка для отображения категории преступления */
const CheckboxYears = ({
 titleBtn,
 accidents,
 filteredAccidents,
 setFilterDistrict,
 filterCrimesData,
 setPeriodVisible,
 selectedDatees,
 selectedRegion,
 selectedCategory,
 years,
 setYears,
 checkedYears,
 selectedDates,
 setSelectedDates,
 setCheckedYears,
 getCard,
}) => {
 /** переменные
  * visible - состояние выпадашки
  * selectedDates - выбранный период дат
  * selectedDate - выбранный тип даты из кнопок
  * checkedCategories - выбранные катерогии
  * districtsAndStreets - jcy
  */
 const [visible, setVisible] = useState(false);
 const [selectedDate, changeSelectedDate] = useState(1);

 /** получение основных данных */

 const clearAll = () => {};
 const menu = (
  <Menu className="Ant_Drop_Block_Style">
   {years.sort().map((el, index) => {
    return (
     <Menu.Item
      key={index}
      className={`Ant_Drop_Block_item ${
       selectedDate === index ? "active" : ""
      }`}
      onClick={() => {
       setSelectedDates(el);
       changeSelectedDate(index);
      }}
     >
      <Typography.Text className="Ant_Drop_Block_Style_text">
       За {el}
      </Typography.Text>
     </Menu.Item>
    );
   })}

   {selectedDates?.length !== 0 ? (
    <Menu.Item key="6" className="Ant_Drop_Block_item">
     <div
      className="Ant_Drop_Block_btn"
      style={{
       display: "flex",
       justifyContent: `${
        checkedYears && selectedDates ? "space-between" : "flex-end"
       }`,
      }}
     >
      {checkedYears && (
       <span className="default_btn_style active">
        <span
         /** сброс данных */
         onClick={() => {
          getCard({ dates: parseInt(moment().format("YYYY")) });
          setCheckedYears(parseInt(moment().format("YYYY")));
          setVisible(!visible);
          setCheckedYears(null);
         }}
        >
         Сбросить
        </span>
       </span>
      )}
      {selectedDates && (
       <span
        className={`default_btn_style ${
         selectedDate?.length === 0 ? "" : "active"
        }`}
       >
        <span
         /** применить выбранные данные */
         onClick={() => {
          getCard({ dates: selectedDates });
          setCheckedYears(selectedDates);
          setVisible(!visible);
         }}
        >
         Применить
        </span>
       </span>
      )}
     </div>
    </Menu.Item>
   ) : null}
  </Menu>
 );

 return (
  <Dropdown
   overlay={menu}
   trigger={["click"]}
   visible={visible}
   onVisibleChange={(val) => {
    setVisible(val);
   }}
   className="ant_drop_menu"
  >
   <Button className="ant_drop_btn">
    {titleBtn} <DownOutlined />
   </Button>
  </Dropdown>
 );
};

/** Redux переменные */
// const mapStateToProps = (state) => {
//  return {
//   accidents: state.crimesReducer.roadWorks ?? [],
//   filteredAccidents: state.crimesReducer.filteredroadWorks,
//   selectedDatees: state.crimesReducer.selectedDate ?? "",
//  };
// };

// /** Redux функции */
// const mapDistrictToProps = (dispatch) => ({
//  filterCrimesData: () => dispatch({ type: FILTER_CRIMES_DATA }),
//  setFilterDistrict: (payload) => dispatch(setFilterValue(payload)),
// });
export default connect(null, null)(CheckboxYears);
