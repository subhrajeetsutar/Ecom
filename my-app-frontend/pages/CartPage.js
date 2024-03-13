import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
  @media screen and (min-width: 768px){
    grid-template-columns: 1.3fr 0.7fr;
  }
`;
const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  font-weight: 700;
`;
const ProductInfoCell = styled.td`
  padding: 10px 0;
`;
const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  background-color: #f0f0f0;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;
  display: flex;
  justify-content: center;
  img {
    max-width: 80px;
    max-height: 80px;
  }
  @media screen and (min-width: 768px){
    padding: 10px;
    width: 100px;
    img {
    max-width: 50px;
    max-height: 50px;
  }
  }
`;
const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px){
display: inline-block;
padding: 0 13px;
  }
`;
const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart} = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', {ids:cartProducts})
      .then(response => {
        
        setProducts(response.data);
      })
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  useEffect(()=>{
    if(typeof window === 'undefined'){
      return;
    }
    if(window.location.href.includes('success')){
      setSuccess(true);
    clearCart();
    }
  },[]);
  function moreofThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }
  async function goToPayments(){
    const response=await axios.post('api/checkout',{name,email,country,pinCode,street,city,cartProducts})
  if(response.data.url){
    window.location=response.data.url;
  }
  }
  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }
  if(success){
    return(
      <>
      <Header/>
      <Center>
        <ColumnWrapper>
        <Box>
          <h1>Thanks for your Order!</h1>
          <p>We will ship your order shortly. </p>
        </Box>
        </ColumnWrapper>
      </Center>
      </>
    )
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnWrapper>
          <Box>
            <h2>Cart</h2>
            {!cartProducts?.length && <div>Your Cart is Empty</div>}
            {products?.length > 0 && (
              <>
                <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Prices</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr>
                      <td>
                        <ProductInfoCell>
                          <ProductImageBox>
                            <img src={product.images[0]} alt="" />
                          </ProductImageBox>
                        </ProductInfoCell>
                        {product.title}
                      </td>
                      <td>
                        <Button onClick={() => lessOfThisProduct(product._id)}>
                          -
                        </Button>
                        <QuantityLabel>
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </QuantityLabel>
                        <Button onClick={() => moreofThisProduct(product._id)}>
                          +
                        </Button>
                      </td>
                      <td>
                        Rs{" "}
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Rs{total}</td>
                  </tr>
                </tbody>
                </Table>
                
              </>
            )}
          </Box>

          {!!cartProducts?.length && (
            <Box>
              <h2>Order Information</h2>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  name='name'
                  onChange={(ev) => setName(ev.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  name='email'
                  onChange={(ev) => setEmail(ev.target.value)}
                />
                <CityHolder>
                  <Input
                    type="text"
                    placeholder="City"
                    value={city}
                    name='city'
                    onChange={(ev) => setCity(ev.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Pin Code"
                    value={pinCode}
                    name='pinCode'
                    onChange={(ev) => setPinCode(ev.target.value)}
                  />
                </CityHolder>
                <Input
                  type="text"
                  placeholder="Country"
                  value={country}
                  name='country'
                  onChange={(ev) => setCountry(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Street Address"
                  value={street}
                  name='street'
                  onChange={(ev) => setStreet(ev.target.value)}
                />
                <Button black block outline type="submit" 
                onClick={goToPayments}
                >
                  Continue to Payment
                </Button>
            </Box>
          )}
        </ColumnWrapper>
      </Center>
    </>
  );
}
