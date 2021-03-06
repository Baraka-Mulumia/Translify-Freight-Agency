import React from "react";
import { ImgWrapper, Img } from "./elements";

export default function Image({ src, start, alt, rounded }) {
  return (
    <ImgWrapper start={start}>
      <Img src={src} alt={alt} rounded={rounded} />
    </ImgWrapper>
  );
}
