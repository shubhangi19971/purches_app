
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'


function Order() {
  const {register, handleSubmit, formState:{errors}, reset, setValue} = useForm()
      const [products, setProducts] = useState([])
      const [productsbackend, setProductsBackend] = useState([])
      const [vendors, setVendors] = useState([])
      const [order_products, setOrder_products] = useState([]);
      const [show_products, setShow_products] = useState([]);
      const navigate = useNavigate()

      async function saveData(){
        
        // await axios.post('http://localhost:8000/api/order/', data);
        // console.log("data after post===",data)
  
        // navigate('/order')
        const orderData = {}
        const vendor = parseInt(document.getElementById('exmpleVendor').value)
        const order_number = document.getElementById('order_number').value
        const order_cost = parseFloat(document.getElementById('order_cost').value)
        const delivery_date = document.getElementById('delivery_date').value
        orderData.vendors = vendor
        orderData.products = products
        orderData.order_number = order_number
        orderData.order_cost = order_cost
        orderData.order_delivery_date = delivery_date
        console.log(orderData)
        const resp = await axios.post('http://localhost:8000/api/order/', orderData)
        console.log(resp.data)
        if(resp.status===201){
          alert("Saved Data")
        }
        

      }

      const getVendors = async () =>{
        const resp = await axios.get('http://localhost:8000/api/vendor/')
        setVendors(resp.data)
        console.log(resp.data)
      }


    const addProductToInvoice = (proData) =>{
        
        const total_cost = proData.order_product_cost_per_quantity * proData.order_product_quantity
        proData.order_product_total_cost =total_cost
        const allProducts = products
        let flag = true
        for(let i=0;i<allProducts.length;i++){
          console.log(allProducts[i])
            if(allProducts[i].product_order === proData.product_order){
                const product_quantity = parseInt(allProducts[i].order_product_quantity)
                const pro_quantity = parseInt(proData.order_product_quantity)
                allProducts[i].order_product_quantity = product_quantity + pro_quantity 
                allProducts[i].order_product_total_cost += proData.order_product_total_cost
                flag = false
                break
            }
        }
        if(flag){
            allProducts.push(proData)
        }
        console.log(allProducts)
        let total = 0
        for(let i = 0; i< allProducts.length;i++){
          total += allProducts[i].order_product_total_cost
        }
        document.getElementById('order_cost').value = total
        setProducts(allProducts)
    }

    // const GenerateInvoice = async () => {
    //     const invoice_number = document.getElementById('invoice_number').value
    //     const invoice_data = new Map()
    //     const total_cost = products.reduce((a,b)=>{return a.product_total_cost + b.product_total_cost})
    //     invoice_data.set('products', products)
    //     invoice_data.set('invoice_number', invoice_number)
    //     invoice_data.set('total_cost', total_cost)

    //     const resp = await axios.post('http://localhost:8000/invoice/', invoice_data)
    //     if (resp.status===201){

    //     }
    // }

    const getAllProducts = async () => {
        const data = await axios.get('http://localhost:8000/api/products/')
        setProductsBackend(data.data)
    }

    const fillData = async () => {
        const product = document.getElementById('product').value
        const resp = await axios.get(`http://localhost:8000/api/products/${product}/`)
        setValue('product_order', resp.data.product_id)
        setValue('order_product_quantity', resp.data.product_quantity)
        setValue('order_product_cost_per_quantity', resp.data.product_cost_per_quantity)

    }

   

    const [users, setUser] = useState([])
    async function fetchOrderProduct(){
    const result = await axios.get('http://localhost:8000/api/order/')
        setUser(result.data)
        sessionStorage.getItem("order_id")
        sessionStorage.getItem("order_date")
        sessionStorage.getItem("order_number")
        sessionStorage.getItem("order_delivery_date")
        sessionStorage.getItem("order_status")
        // sessionStorage.getItem("product_order")
        setValue("order_id", sessionStorage.getItem("order_id"))
        setValue("order_date", sessionStorage.getItem("order_date"))
        setValue("order_number", sessionStorage.getItem("order_number"))
        setValue("order_delivery_date", sessionStorage.getItem("order_delivery_date"))
        setValue("order_status", sessionStorage.getItem("order_status"))
        // setValue("product_order", sessionStorage.getItem("product_order"))
    }
    
    useEffect(()=>{
      getAllProducts()
      getVendors() 
      fetchOrderProduct()
   }, [products])

      



 
     return (
    
      
 
    <div className='container gap-3'>
      <div className='container'>
        <div className='col-mb-3'>
          <label htmlFor='exampleVendor' className='form-label'>Vendor</label>
          <select className='form-select' id='exmpleVendor'>
            <option defaultValue="">Please Select Vendor</option>
            {
              vendors.map((vendor)=>{
                return (
                  <>
                    <option value={vendor.vendor_id}>{vendor.vendor_name}</option>
                  </>
                )
              })
            }
          </select>
        </div>
        
            <div className='col-mb-3'>
                <label className='form-label' htmlFor='order_number'>Order Number</label>
                <input className='form-control' type='text' id="order_number"/>
            </div>
        
        
            <div className='col-mb-3'>
                <label className='form-label' htmlFor='order_cost'>Order Total Cost Without GST</label>
                <input className='form-control' type='number' id="order_cost"/>
            </div>
        
        
            <div className='col-mb-3'>
                <label className='form-label' htmlFor='order_cost_with_gst'>Order Total Cost With GST</label>
                <input className='form-control' type='number' id="order_cost_with_gst"/>
            </div>
            <div className='col-mb-3'>
                <label className='form-label' htmlFor='delivery_date'>Order DELIVERY Date</label>
                <input className='form-control' type='date' id="delivery_date"/>
            </div>
        
      </div>
        
        <div className='container mx-auto'>
            <div>
                <label className='form-label'>Select Product</label>
                <select {...register('product_name')} id="product" className="form-select" onChange={()=>{fillData()}}>
                <option defaultValue="">Please Select Product</option>
                        {
                            productsbackend.map((pro)=>{
                                return(
                                    <>
                                        <option value={pro.product_id}>{pro.product_name}</option>
                                    </>
                                )
                            })
                        }
                </select>
            </div>
            <form onSubmit={handleSubmit(addProductToInvoice)}>
                <div className='col-mb-3'>
                    <label htmlFor='exampleProductName' className='form-label'>Product Name</label>
                    <input type="number" id="exampleProductName" className='form-control' {...register('product_order')} />
                </div>
                <div className='col-mb-3'>
                    <label htmlFor='exampleProductQuantity' className='form-label'>Product Quantity</label>
                    <input type="text" id="exampleProductQuantity" className='form-control' {...register('order_product_quantity')} />
                </div>
                <div className='col-mb-3'>
                    <label htmlFor='exampleProductprice' className='form-label'>Product Price</label>
                    <input type="text" id="exampleProductPrice" className='form-control' {...register('order_product_cost_per_quantity')} />
                </div>
                <button type='submit' className='btn btn-outline-success col-6 mx-auto'>Add Product</button>
                <button type='button' className='btn btn-outline-warning col-6 mx-auto' onClick={()=>{reset()}}>Reset</button>
            </form>
            </div> 



<br/><br/>
        <div className='container'>
            <table className='table table-dark'>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Product Total Cost</th>
                    </tr>
                </thead>
                <tbody className='table-info'>
                    {
                        products.map((pro)=>{
                            return(
                            <tr>
                                <td>{pro.product_order}</td>
                                <td>{pro.order_product_quantity}</td>
                                <td>{pro.order_product_cost_per_quantity}</td>
                                <td>{pro.order_product_total_cost}</td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
        <button className='btn btn-outline-primary float-end col-6' onClick={()=>{saveData()}}>Generate Invoice</button>
    </div>
  )
}
 


export default Order