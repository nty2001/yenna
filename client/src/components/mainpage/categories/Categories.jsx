
import React from 'react'
import { useContext,useState } from "react";
import { GobalState } from "../../../GobalState";
import axios from 'axios';
const Categories = () => {
    const state = useContext(GobalState);
    const [onEdit,setOnEdit] = useState(false)
    const [categories] = state.CategoryApi.categories;
    const [callback, setCallback] = state.CategoryApi.callback;
    const [category,setcategory]= useState("")
    const [token] = state.token;
    
    const createCategory = async(e)=>{
        e.preventDefault();
        try{
            if(onEdit){
                const res = await axios.put(`/api/category/${id}`,{name:category},{
                    headers: {Authorization: token}, 
            })
            alert(res.data)
        }
            else{
                const res = await axios.post("/api/category",{name:category},{
                    headers:{Authorization: token}, 
            })
            alert(res.data)
        }
        setcategory("")
            setCallback(!callback);
            setOnEdit(false)
            // console.log(callback)
        } catch (error) {
            alert(error.response.data.msg);
        }
    }
    
    const [id,setId] = useState("")
    const editCategory = (id,name)=>{
        setId(id)
        setOnEdit(true)
        setcategory(name)
        
    }
    const deleteCategory = async(id)=>{
        try{
            const res = await axios.delete(`/api/category/${id}`,{
                headers:{Authorization: token},
            })
            alert(res.data)
            
        } catch (error) {
            alert(error.response.data.msg);
        }
    }
 
  return (
    <div className="category">
        <form onSubmit={createCategory}>
            <label>
                Category
                <input type="text" value={category}
                onChange={(e)=> setcategory(e.target.value)}
                />
            </label>
            <button>{onEdit?"Update":"Create"}</button>
        </form>
        <div className="col">
            {categories.map((item)=>(
                <div className="row" key={item._id}>
                    <p>{item.name}</p>
                    <div>
                        <button onClick={() =>editCategory(item._id,item.name)}>Edit</button>
                        <button  onClick={() =>deleteCategory(item._id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Categories