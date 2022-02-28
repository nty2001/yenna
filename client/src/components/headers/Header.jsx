import { useContext,useState } from "react";
import { GobalState } from "../../GobalState";
import Menu from "./icon/bars-solid.svg";
import Cart from "./icon/cart-arrow-down-solid.svg";
import Times from "./icon/times-solid.svg";
import { Link } from "react-router-dom";

import axios from "axios";
const Header = () => {
  const state = useContext(GobalState);
  const [isLogged]= state.UserApi.isLogged;
  const [isAdmin]= state.UserApi.isAdmin;
  const [cart] = state.UserApi.cart;
  const adminRouter =()=>{
    return(
      <>
      <li>
          <Link to="/create_product"> create Products</Link>
        </li>
        <li>
          <Link to="/category">category</Link>
        </li>
      </>
    );
  };
const loggerRouter = ()=>{
  return(
    <>
    <li>
        <Link to="/history">History</Link>
      </li>
      <li>
        <Link to="/" onClick ={logout}>
          logout
          </Link>
      </li>
    </>
  );
};
const logout = async()=>{
  window.localStorage.clear();
  window.location ="/";
  await axios.get("/user/logout");
};
const [menu,setMenu]=useState(false);
const styleMenu={
  left:menu? "0" : "-100%",
}
console.log(styleMenu)

  return (
    <header>
      <div className="menu" onClick={() =>setMenu(!menu)}>
        <img src={Menu} alt="" width="30" />
      </div>
      <div className="logo" >
        <h1>
          <Link to="/">{isAdmin ? "Yenna":"Yenna"}</Link>
        </h1>
      </div>
      <ul style={styleMenu}>
        <li>
          <Link to="/">{isAdmin ? "Products":"Shop"}</Link>
        </li>
        {isAdmin && adminRouter()}
        {isLogged ?(
          loggerRouter()
        ):(
          <li>
          <Link to="/login">Login & Register</Link>
        </li>
        )}
        
        
        <li onClick={() =>setMenu(!menu)} >
          <img src={Times} alt="" width="30" className="menu" />
        </li>
      </ul>
     {!isAdmin ? (
        <div className="cart">
        <span>{cart.length}</span>
        <Link to="/cart">
          <img src={Cart} alt="" width="30" />
        </Link>
        </div>
         ):(
           ""
         )}
    </header>
  );
};

export default Header;
