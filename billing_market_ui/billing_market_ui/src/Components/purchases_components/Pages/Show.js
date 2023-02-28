import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
function Show() {

    const [users, setUser] = useState([])
    async function fetchAllUsers(){
    /*const result = await axios.get('http://localhost:8000/api/order/')
        setUser(result.data)*/
    }
    
    useEffect(()=>{
        fetchAllUsers();
    }, [])

  return (
    <>
        <table className='table table-dark'>
        <thead>
            <tr>
                <th>order_id</th>
                <th>order_number</th>
                <th>order_status</th>
                <th>order_date</th>
                <th>order_delivery_date</th>
                <th>vendors</th>
                <th>Action</th>
                
            </tr>
        </thead>
        <tbody>
            {
                users.map(obj=>{
                    return(
                        <tr>
                            <td>{obj.order_id}</td>
                            <td>{obj.order_number}</td>
                            <td>{obj.order_status}</td>
                            <td>{obj.order_date}</td>
                            <td>{obj.order_delivery_date}</td>
                            <td>{obj.vendors}</td>
                            <td><NavLink to={`/OrderShow/${obj.order_id}`}><button className='btn btn-outline-warning'>ORDER INFO</button></NavLink></td>
                            
                        </tr>
                    )
                })
            }
        </tbody>
      </table>
    </>
  )
}

export default Show