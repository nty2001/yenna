import { useContext } from "react";
import { GobalState } from "../../../GobalState";
import React from 'react'
const LoadMore = () => {
    const state = useContext(GobalState);
    const [page, setPage] = state.ProductsApi.page;
    const [result] = state.ProductsApi.result;
  
 return <div className="load__more">
     {result < page * 8 ? "" : <button onClick={() =>setPage(page+1)}>Load More</button>}
     </div>;

  
};

export default LoadMore;