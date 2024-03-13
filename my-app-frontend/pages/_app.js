import { CartContextProvider } from "@/components/CartContext";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
body{
  padding:0;
  margin:0;
  font-family:'Roboto', sans-serif;
  background-color: #f0f0f0;
}
`;
export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps}/>
      </CartContextProvider>
    </>
  );
}
