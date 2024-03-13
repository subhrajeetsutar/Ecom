import Link from "next/link";
import { styled } from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bar";

const StyledHeader = styled.header`
  background-color: #222;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const NavLink = styled(Link)`
color: #aaa;
text-decoration: none;
display: block;
padding: 10px 0;
@media screen and (min-width: 768px){
padding: 0;
}
`;
const StyledNav = styled.nav`
${props=>props.mobileNav?`
display:block;
`:`
display:none;
`}
gap:15px;
top: 0;
bottom: 0;
position: fixed;
left: 0;
right: 0;
padding: 70px 20px 20px;
background-color: #222;
@media screen and (min-width: 768px){
  display: flex;
  position: static;
  padding: 0;
}
`;
const NavButton= styled.div`
background-color: transparent;
width: 20px;
height: 20px;
border: 0;
color: white;
cursor: pointer;
position: relative;
  z-index: 3;
@media screen and (min-width: 768px){
  display: none;
}
`;
export default function Header() {
  const {cartProducts} = useContext(CartContext);
  const[mobileNav, setMobileNav]=useState(false);
  return (
    <div>
      <StyledHeader>
        <Center>
          <Wrapper>
            <Logo href={"/"}>Ecommerce</Logo>
            <StyledNav mobileNav={mobileNav}>
              <NavLink href={"/"}>Home</NavLink>
              <NavLink href={"/Products"}>All Products</NavLink>
              <NavLink href={"/categories"}>Categories</NavLink>
              <NavLink href={"/account"}>Account</NavLink>
              <NavLink href={"/CartPage"}>My Cart ({cartProducts.length})</NavLink>
            </StyledNav>
            <NavButton onClick={()=>setMobileNav(prev=>!prev)}>
<BarsIcon/>
              </NavButton>
          </Wrapper>
        </Center>
      </StyledHeader>
    </div>
  );
}
