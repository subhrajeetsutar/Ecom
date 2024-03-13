import styled from 'styled-components';
import Center from './Center';
import ProductsGrid from './ProductsGrid';

const Title = styled.h2`
font-size: 1.5rem;
margin: 30px 0 20px;
`;
export default function NewProduct({products}) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid products={products}/>
    </Center>
  )
}
