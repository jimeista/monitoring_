import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Button, Input, Typography, Checkbox } from "antd";
import { DownOutlined } from "@ant-design/icons";
// import {
//  setSelectedDistrictsAndStreets,
//  setFilterValue,
// } from "../redux/actions";
// import { connect } from "react-redux";
// import { FILTER_CRIMES_DATA, FILTER_ACCIDENTS_DATA } from "../redux/types";
const jp = require("jsonpath");

/** Выпадашка для отображения категории преступления */
const CheckboxDistricts = ({
 titleBtn,
 filteredAccidents,
 setSelectedDistrict,
 setFilterDistrict,
 filterCrimesData,
 setPeriodVisible,
 selectedDistricts,
 reset,
 setReset,
 selectedDistrict,
 checkedDistricts,
 setCheckedDistricts,
 getCard,
 checkedYears,
 initialDistrict,
}) => {
 /** переменные
  * visible - состояние выпадашки
  * districtsAndStreets - основные категории
  */
 const [visible, setVisible] = useState(false);

 useEffect(() => {
  setSelectedDistrict([]);
  setReset(false);
 }, [reset]);

 const menu = (
  <Menu className="Ant_Drop_Block_Style">
   <Menu.Item key="2" className="Ant_Drop_Block_Style_Checkbox">
    <div style={{ height: "200px" }}>
     <Checkbox.Group
      value={selectedDistrict}
      onChange={(v) => {
       setSelectedDistrict(v);
      }}
      className="ant_drop_block_item_list"
     >
      {[
       "Ауэзовский район",
       "Бостандыкский район",
       "Алатауский район",
       "Медеуский район",
       "Алмалинский район",
       "Турксибский район",
       "Наурызбайский район",
       "Жетысуский район",
      ]
       .sort((a, b) => {
        if (a.includes("Не указан")) {
         return 1;
        } else if (b.includes("Не указан")) {
         return -1;
        } else if (a < b) return -1;
        else if (a > b) return 1;
        return 0;
       })
       .map((el, index) => {
        return (
         <Checkbox
          key={index}
          value={el}
          className={`ant-checkbox-group-item ant-checkbox-wrapper ant-checkbox-wrapper-checked`}
         >
          {el}
         </Checkbox>
        );
       })}
     </Checkbox.Group>
    </div>
   </Menu.Item>

   {selectedDistrict?.length !== 0 ? (
    <Menu.Item key="6" className="ant_drop_block_item">
     <div
      className="ant_drop_block_btn"
      style={{
       display: "flex",
       justifyContent: `${
        selectedDistrict?.length > 0 && checkedDistricts?.length > 0
         ? "space-between"
         : "flex-end"
       }`,
      }}
     >
      {checkedDistricts?.length > 0 && (
       <span
        className={`default_btn_style ${
         checkedDistricts?.length === 0 ? "" : "active"
        }`}
       >
        <span
         /**
          * приминение выбранных данных
          */
         onClick={() => {
          setSelectedDistrict([initialDistrict]);
          setCheckedDistricts([]);
          getCard({
           disricts: [initialDistrict],
           dates: checkedYears,
          });

          setVisible(false);
         }}
        >
         Сбросить
        </span>
       </span>
      )}
      {selectedDistrict?.length > 0 && (
       <span
        className={`default_btn_style ${
         selectedDistrict?.length === 0 ? "" : "active"
        }`}
       >
        <span
         /**
          * приминение выбранных данных
          */
         onClick={() => {
          setCheckedDistricts(selectedDistrict);
          getCard({
           disricts: selectedDistrict,
           dates: checkedYears,
          });

          setVisible(false);
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
    // setPeriodVisible(false);
   }}
   className="ant_drop_menu"
  >
   <Button className="ant_drop_btn">
    {titleBtn} <DownOutlined />
   </Button>
  </Dropdown>
 );
};

// /** Redux переменные */
// const mapStateToProps = (state) => {
//  return {
//   filteredAccidents: state.crimesReducer.filteredroadWorks,
//   selectedDistricts: state.crimesReducer.selectedDistricts ?? [],
//   selectedStreets: state.crimesReducer.selectedStreets,
//  };
// };
// /** Redux функции */
// const mapDistrictToProps = (dispatch) => ({
//  filterCrimesData: () => dispatch({ type: FILTER_CRIMES_DATA }),
//  setFilterDistrict: ({ districts, streets }) =>
//   dispatch(
//    setFilterValue({
//     selectedDistricts: districts,
//     selectedStreets: streets,
//     is1: false,
//     is2: true,
//     is3: false,
//     is4: false,
//    })
//   ),
// });
export default CheckboxDistricts;
