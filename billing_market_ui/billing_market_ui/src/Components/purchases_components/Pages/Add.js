import React, { useEffect,useState } from 'react'
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

function Add() {
    const {register, handleSubmit, setValue} = useForm ();
    const navigate = useNavigate()
    const [vendors, setVendors] = useState([])
    const [products , setProducts] = useState([])
    const [order_products, setOrder_products] = useState([]);

    function saveData(data){
      var currentUser = {order_id: data.order_id, order_date: data.order_date, order_number: data.order_number, order_delivery_date: data.order_delivery_date, order_status: data.order_status, product_order: data.product_order}
      console.log(currentUser)
      sessionStorage.setItem("order_id", data.order_id)  
      sessionStorage.setItem("order_date", data.order_date)  
      sessionStorage.setItem("order_number", data.order_number)  
      sessionStorage.setItem("order_delivery_date", data.order_delivery_date)  
      sessionStorage.setItem("order_status", data.order_status)  
      sessionStorage.setItem("product_order", data.product_order)  
      axios.post('http://localhost:8000/api/order/', data);
      navigate('/user/add')
    }

  
    
    const getVendors = async () =>{
      const resp = await axios.get('http://localhost:8000/api/vendor/')
      setVendors(resp.data)
      console.log(resp.data)
    }

    const getProducts = async () => {
      const resp = await axios.get('http://localhost:8000/api/products/')
      setProducts(resp.data)
      console.log(resp.data)
    }

    useEffect(()=>{
      getVendors()
      getProducts()
    },[])

    const [users, setUser] = useState([])
    async function fetchOrderProduct(){
    const result = await axios.get('http://localhost:8000/api/order/')
        setUser(result.data)
        sessionStorage.getItem("order_id")
        sessionStorage.getItem("order_date")
        sessionStorage.getItem("order_number")
        sessionStorage.getItem("order_delivery_date")
        sessionStorage.getItem("order_status")
        sessionStorage.getItem("product_order")
        setValue("order_id", sessionStorage.getItem("order_id"))
        setValue("order_date", sessionStorage.getItem("order_date"))
        setValue("order_number", sessionStorage.getItem("order_number"))
        setValue("order_delivery_date", sessionStorage.getItem("order_delivery_date"))
        setValue("order_status", sessionStorage.getItem("order_status"))
        setValue("product_order", sessionStorage.getItem("product_order"))
    }

    const fetchAllProducts = async ()=> {
      const resp = await axios.get('http://localhost:8000/api/products/')
      setProducts(resp.data)
    }

    const addOrderToProduct = async() => {
      const p_id = document.getElementById('product').value
      const resp = await axios.get(`http://localhost:8000/api/products/${p_id}`)
      const data = resp.data
      const allProducts = order_products
      allProducts.push(data)
      setOrder_products(allProducts)

    }
    
    useEffect(()=>{
      fetchOrderProduct();
      fetchAllProducts();
    }, [])

  return (
    <>
        <center><h1>PRODUCTS ORDER</h1></center>
        <form className='form-control' onSubmit={handleSubmit(saveData)}>

            <b><h2>ORDER DETAILS:</h2></b>

            <label htmlFor='order_id'><b>ORDER ID:</b></label> &nbsp;
            <input type='number' id='order_id' {...register("order_id")}/> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

            <label htmlFor='order_date'><b>ORDER DATE:</b></label>&nbsp;
            <input type='date' id='order_date'{...register("order_date")}/>
            <br/><br/>
            <label htmlFor='order_number'><b>ORDER NUMBER:</b></label>&nbsp;
            <input type='text' id='order_number'{...register("order_number")}/> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            
            <label htmlFor='order_delivery_date'><b>ORDER DELIVERY DATE:</b></label>&nbsp;
            <input type='date' id='order_delivery_date'{...register("order_delivery_date")}/>
            <br/><br/>
            <label htmlFor='order_status'><b>ORDER STATUS:</b></label>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <input type='option' id='order_status'{...register("order_status")}/> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

            <label htmlFor='product_order'><b>PRODUCT:</b></label>
            <select {...register('product_order')} id="product" >
              {products.map((product)=>{
                return(
                  <>
                     <option value={product.product_id}>{product.product_name}</option>
                  </>
                )
              })}
            </select> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            
            <button type='button' onClick={()=>{addOrderToProduct()}} className="btn btn-warning">ADD ORDER</button>
            <label htmlFor='vendors'><b>VENDORS NAME:</b></label>
            <select {...register('vendors')} >
              {vendors.map((vendor)=>{
                return(
                  <>
                    <option value={vendor.vendor_id}>{vendor.vendor_name}</option>
                  </>
                )
              })}
            </select>
            <br/> <br/>

            <input type='submit' value='ADD ORDER' className='btn btn-outline-success'/>
            <input type='reset' value='RESET' className='btn btn-outline-warning' />
            <br/><br/>
            <table className='table table-dark'>
            <thead>
            <tr>
                <th>ORDER_ID</th>
                <th>PRODUCT_NAME</th>
                <th>PRODUCT_QUANTITY</th>
                <th>PRODUCT_PRICE</th>
                <th>PRODUCT_COST</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {order_products.length &&<>{
                order_products.map(obj=>{
                    return(
                        <tr>
                            <td>{obj.order_id}</td>
                            <td>{obj.product_name}</td>
                            <td>{obj.product_quantity}</td>
                            <td>{obj.product_cost_per_quantity}</td>
                            <td>{obj.product_total_cost}</td>
                            <td><NavLink to={`/OrderShow/${obj.order_id}`}><button className='btn btn-outline-warning'>ORDER INFO</button></NavLink></td>
                            
                        </tr>
                    );
                })}</>
              }
        </tbody>
            </table>
        </form>
    </>
  )
}

export default Add