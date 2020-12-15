import React, { useState } from "react";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
// import { setFilterValue } from "../redux/actions";
// import { FILTER_CRIMES_DATA } from "../redux/types";
import Search from "antd/lib/input/Search";
const jp = require("jsonpath");

/** Выпадашка для отображения категории преступления */
const CheckboxCategory = ({
 titleBtn,
 filteredCrimesData,
 setFilterCategories,
 filterCrimesData,
 setPeriodVisible,
 large,
 search,
 selectedCategory,
 setSelectedCategory,
 reset,
 setReset,
 getCard,
 setCheckedCategories,
 checkedCategories,
}) => {
 /** переменные
  * visible - состояние выпадашки
  * categories - основные категории
  * filteredCategories - отфильтрованные категории
  * checkedCategories - выбранные катерогии
  * filterValue - строка поиска
  */
 const [visible, setVisible] = useState(false);
 const [categories, setCategories] = useState([
  "Капитальный ремонт дворов",
  "Высадка деревьев",
  "Кол-во мест в детских садах",
  "Кол-во мест в школах",
  "Благоустройство парков и скверов",
  "Средний ремонт дорог",
  "Капитальный ремонт пешеходной зоны",
  "Строительство и реконструкция водопровода и канализации",
  "Строительство и реконструкция арыков",
 ]);
 const [filteredCategories, setFilteredCategories] = useState([]);
 const [filterValue, setFilterValue] = useState("");

 /** При сбросе обнуление данных */
 useEffect(() => {
  //   reset && clearAll();
  setReset(false);
 }, [reset]);

 /** Парсинг данных из json */
 const parseCategoriesFromJson = (json) => {
  return [
   ...new Set(jp.query(JSON.parse(JSON.stringify(json)), "$..['category']")),
  ];
 };

 /** Поиск и фильтрация */
 const handleSearch = (event) => {
  let temp = [
   ...new Set([
    ...checkedCategories,
    ...categories.filter((el) =>
     el.toLowerCase().includes(event.target.value.toLowerCase())
    ),
   ]),
  ];
  setFilteredCategories(temp);
  setFilterValue(event.target.value);
 };

 const menu = (
  <Menu className={`Ant_Drop_Block_Style ${large ? "large" : ""} `}>
   <div className="info-panel large_list">
    {filteredCrimesData?.length === 0 ? "Нет Данных" : ""}
   </div>

   {selectedCategory?.length !== 0 ? (
    <div>
     <Checkbox.Group
      value={selectedCategory}
      className="Ant_Drop_Block_Style_Checkbox"
      options={[
       "Капитальный ремонт дворов",
       "Высадка деревьев",
       "Кол-во мест в детских садах",
       "Кол-во мест в школах",
       "Благоустройство парков и скверов",
       "Средний ремонт дорог",
       "Капитальный ремонт пешеходной зоны",
       "Строительство и реконструкция водопровода и канализации",
       "Строительство и реконструкция арыков",
      ]}
      onChange={(v) => {
       setSelectedCategory(v);
      }}
     />
    </div>
   ) : null}

   {selectedCategory?.length !== 0 ? (
    <Menu.Item key="6" className="ant_drop_block_item">
     <div
      className="ant_drop_block_btn"
      style={{
       display: "flex",
       justifyContent: `${
        selectedCategory?.length > 0 && checkedCategories?.length
         ? "space-between"
         : "flex-end"
       }`,
      }}
     >
      {checkedCategories?.length > 0 && (
       <span
        className={`default_btn_style ${
         checkedCategories?.length === 0 ? "" : "active"
        }`}
       >
        <span
         /** Применение выбранных данных */
         onClick={() => {
          setCheckedCategories([]);
          //   getCard();
         }}
        >
         Сбросить
        </span>
       </span>
      )}
      {selectedCategory?.length > 0 && (
       <span
        className={`default_btn_style ${
         selectedCategory?.length === 0 ? "" : "active"
        }`}
       >
        <span
         /** Применение выбранных данных */
         onClick={() => {
          setCheckedCategories(selectedCategory);
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
    setPeriodVisible(false);
   }}
   className="ant_drop_menu"
  >
   <Button className="ant_drop_btn">
    {titleBtn}
    <DownOutlined />
   </Button>
  </Dropdown>
 );
};

/** Redux переменные */
// const mapStateToProps = (state) => {
//   return {
//     filteredCrimesData: state.crimesReducer.filteredroadWorks ?? [],
//     selectedCategories: state.crimesReducer.selectedCategories ?? [],
//   };
// };

// /** Redux функции */
// const mapDistrictToProps = (dispatch) => ({
//   setFilterCategories: ({ categories }) =>
//     dispatch(
//       setFilterValue({
//         selectedCategories: categories,
//         is1: false,
//         is2: false,
//         is3: true,
//         is4: false,
//       })
//     ),
//   filterCrimesData: () => dispatch({ type: FILTER_CRIMES_DATA }),
// });
export default connect(null, null)(CheckboxCategory);
