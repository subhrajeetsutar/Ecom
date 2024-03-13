import { useState } from "react";
import styled from "styled-components";

const BigImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
const ImageButtons = styled.div`
  display: flex;
  max-width: 100%;
  max-height: 100%;
  gap: 2px;
  margin-top: 10px;
`;
const ImageButton = styled.div`
  ${(props) =>
    props.active
      ? `
border-color:#ccc;
`
      : `
border-color:transparent;
opacity: .6;
`};
  border: 1px solid #ccc;
  border-radius: 2px;
  height: 40px;
  /* height: auto; */
  padding: 1px;
  cursor: pointer;
`;
const BGImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  position: absolute;
  /* top: 0;
bottom: 0; */
`;
const BGImageWrapper = styled.div`
  /* text-align: center; */
  /* height: 0; */
  padding-bottom: 75%;
  position: relative;
  overflow: hidden;
`;
export default function ProductImages({ images }) {
  const [activeImage, setactiveImage] = useState(images?.[0]);

  return (
    <>
      <BGImageWrapper>
        <BGImage src={activeImage} />
      </BGImageWrapper>
      <ImageButtons>
        {images.map((image) => (
          <ImageButton
            key={image}
            active={image === activeImage}
            onClick={() => setactiveImage(image)}
          >
            <BigImage src={image} />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}
