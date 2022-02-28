import React from 'react'
import { GobalState } from "../../../GobalState";
import { useContext } from "react";
import { Link } from "react-router-dom";
const Orderhistory = () => {
const state = useContext(GobalState);
const [history] = state.UserApi.history;
if(history.length === 0) return null;
console.log("🚀 ~ file: Orderhistory.jsx ~ line 8 ~ Orderhistory ~ history", history)

 
  return (
    <div className="history">
      <h2>History</h2>
      <h4>you have to {history.length} ordered</h4>
      <table>
        <thead>
          <tr>
            <td>Payment ID</td>
            <td>Date</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
        {history.map((item)=>(
          <tr key={item._id}>
            <td>{item.paymentID}</td>
            <td>{new Date(item.createdAt).toLocaleDateString()}</td>
            <td>
              <Link to={`/history/${item._id}`}>
                  View
              </Link>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default Orderhistory