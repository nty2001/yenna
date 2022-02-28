import React from 'react'
import { useContext } from "react";
import { GobalState } from "../../../GobalState";
const Filter = () => {
  const state = useContext(GobalState);
  const [categories] = state.CategoryApi.categories;
  const [category, setCategory] = state.ProductsApi.category;
  const [search, setSearch] = state.ProductsApi.search;
  const [sort, setSort] = state.ProductsApi.sort;
  const FilterCategory = (e) => {
    setCategory(e.target.value);
  };
  return (
    <div className="filter">
      <div className="row">
        <select name="category" value={category} onChange={FilterCategory}>
          {categories.map((category) => (
            <option value={"categories=" + category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* search */}
      <input
        type="text"
        value={search}
        placeholder="Enter Search"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <div className="row sort">
        <select value={sort}   onChange={(e) => setSort(e.target.value)}>
          <option value="">Mới Nhất</option>
          <option value="sort=oldest">Cũ Nhất</option>
          <option value="sort=-sold">Số Lượng Giảm Dần </option>
          <option value="sort=-price">Gía Giảm Dần </option>
          <option value="sort=price">Gía Tăng Dần</option>
          
        </select>
      </div>
    </div>
  );
};

export default Filter;
