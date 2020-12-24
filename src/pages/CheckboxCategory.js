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
 checkedDistricts,
 initialDistricts,
 checkedYears,
 initialCategory,
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
  setSelectedCategory([]);
  setReset(false);
 }, [reset]);

 useEffect(() => {
  console.log(large);
 }, [large]);

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
   <div>
    <Checkbox.Group
     value={selectedCategory}
     className="Ant_Drop_Block_Style_Checkbox"
     onChange={(v) => {
      setSelectedCategory(v);
     }}
    >
     {[
      "Капитальный ремонт дворов",
      "Высадка деревьев",
      "Кол-во мест в детских садах",
      "Кол-во мест в школах",
      "Благоустройство парков и скверов",
      "Средний ремонт дорог",
      "Капитальный ремонт пешеходной зоны",
      "Строительство и реконструкция водопровода и канализации",
      "Строительство и реконструкция арыков",
     ].map((el, index) => {
      return (
       <Checkbox
        key={index}
        value={el}
        className={`ant-checkbox-group-item ant-checkbox-wrapper ant-checkbox-wrapper-checked`}
       >
        {checkCategory(el)}
       </Checkbox>
      );
     })}
    </Checkbox.Group>
   </div>

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
          setSelectedCategory([initialCategory]);
          setCheckedCategories([]);
          getCard({
           categories: selectedCategory,
           disricts:
            checkedDistricts.length > 0
             ? checkedDistricts
             : initialDistricts
             ? [initialDistricts]
             : [],
           dates: checkedYears,
          });
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
          getCard({
           categories: selectedCategory,
           disricts:
            checkedDistricts.length > 0
             ? checkedDistricts
             : initialDistricts
             ? [initialDistricts]
             : [],
           dates: checkedYears,
          });
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
   <Button className={`ant_drop_btn ${large ? "large" : ""}`}>
    {titleBtn}
    <DownOutlined />
   </Button>
  </Dropdown>
 );
};

const checkCategory = (name) => {
 switch (name) {
  case "Капитальный ремонт дворов":
   return "Благоустройство дворов";
  case "Строительство и реконструкция садиков":
   return "Кол-во мест в детском саду введены в эксплуатацию";
  case "Строительство и реконструкция школ":
   return "Кол-во мест в школе введены в эксплуатацию";
  case "Реконструкция пешеходной зоны":
   return "Строительство пешеходных тротуаров";
  case "Строительство и реконструкция канализации и водопровода":
   return "Строительство сетей водопровода и канализации";
  case "Строительство и реконструкция арыков":
   return "Строительство арычных сетей";
  case "Строительство линий наружного освещения":
   return "Установка новых световых точек, опор наружного освещения";
  default:
   return name;
 }
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
