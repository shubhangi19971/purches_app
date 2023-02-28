import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'



function Ordershow() {
    const {orderId} = useParams()
    const [order, setOrders] = useState({})
    async function fetchOrdershow(){

    const result = await axios.get(`http://localhost:8000/api/order/${orderId}`)
        setOrders(result.data)
        console.log(result)
        console.log(result.data[0].order_id)
        console.log(result.data[0].order_date)
        const i = 0
    }
    
    useEffect(()=>{
        fetchOrdershow();
    }, [])
  return (
    <>
        <table className='table table-dark'>
        <thead>
            <tr>
                <th>order_id</th>
                <th>order_number</th>
                <th>order_total_cost_without_gst</th>
                <th>order_total_cost_with_gst</th>
                <th>order_status</th>
                <th>order_date</th>
                <th>order_delivery_date</th>
                <th>vendors</th>
            
            </tr>
        </thead>
        <tbody>
                        <tr>
                            <td>{order.order_id}</td>
                            <td>{order.order_number}</td>
                            <td>{order.order_total_cost_without_gst}</td>
                            <td>{order.order_total_cost_with_gst}</td>
                            <td>{order.order_status}</td>
                            <td>{order.order_date}</td>
                            <td>{order.order_delivery_date}</td>
                            <td>{order.vendors}</td>

                        </tr>
                    
        </tbody>
      </table>
    </>

  )
}

export default Ordershow