import { GobalState } from "../../../GobalState";
import { useContext } from "react";
import { Link } from "react-router-dom";
const Btn = ({ item, deleteProduct }) => {
  const state = useContext(GobalState);
  const [isAdmin] = state.UserApi.isAdmin;
  const addCart = state.UserApi.addCart;
  return (
    <div className="product_button">
      {isAdmin ? (
        <>
          <Link
            to="#!"
            className="product__buy"
            onClick={() => deleteProduct(item._id, item.public_id)}
          >
            Delete
          </Link>
          <Link to={`edit_product/${item._id}`} className="product__view">
            update
          </Link>
        </>
      ) : (
        <>
          <Link to="#!" className="product__buy" onClick={() => addCart(item)}>
            Buy
          </Link>
          <Link to={`details/${item._id}`} className="product__view ">
            View
          </Link>
        </>
      )}
    </div>
  );
};

export default Btn;
