import React, { useEffect, useState } from 'react'
import Layout from '@/Components/Layout';
import axios from 'axios';
export default function Orders() {
  const [orders,setOrders]=useState([]);
  useEffect(()=>{

axios.get('/api/orders').then(response=>{
  setOrders(response.data);
});
  },[])
  return (
    <Layout>
        <h1>Orders</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Recipient</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
{orders.length>0 && orders.map(order=>(
<tr>
  <td>{new Date(order.createdAt)
  .toLocaleString()}</td>
  <td>{order.name} {order.email}<br/>
  {order.city} {order.pinCode} {order.country}<br/>
  {order.street}
  </td>
<td>
  {order.line_items.map(l=>(
    <>
    {l.price_data?.product_data?.name} x {l.quantity}<br/>
    </>
  ))}
</td>
</tr>

))}
          </tbody>
        </table>
    </Layout>
  )
}
