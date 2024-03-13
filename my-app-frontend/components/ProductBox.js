import styled from "styled-components";
import Button from "./Button";
import CartIcons from "./icons/CartIcons";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";


const ProductWrapper = styled.div``;
const WhiteBox = styled(Link)`
  background-color: #fff;
  padding:20px;
  height: 100px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title =styled(Link)`
text-decoration: none;
font-weight: normal;
font-size: .9rem;
margin: 0;
color: inherit;
`;
const ProductInfoBox=styled.div`
margin-top: 10px;
`;
const PriceBox =styled.div`
display: block;
align-items: center;
justify-content: space-between;
margin-top: 2px;
@media screen and (min-width: 768px){
  display: flex;
  gap: 5px;
}
`;
const Price = styled.div`
font-size: .9rem;
font-weight: 400;
text-align: right;
@media screen and (min-width: 768px){
  font-size: 1rem;
font-weight: 500;
text-align: left;
}
`;
export default function ProductBox({ _id, title, description, price, images }) {
 const url = '/product/'+_id;
 const {addProduct} = useContext(CartContext)
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <Price>
        <img src={images?.[0]} alt="" />
        </Price>
      </WhiteBox>
      <ProductInfoBox>
      <Title href={url}>{title}</Title>
      <PriceBox>
      <Price>Rs.{price}</Price>
      <Button primary block outline onClick={()=> addProduct(_id)}>Add to Cart</Button>
      </PriceBox>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
