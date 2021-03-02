import React, { Component } from "react";
import styled from "@emotion/styled";
import { PhotoType } from "../types/PhotoType";

const largeX = 1000;
const largeY = 610;
const tinyX = 390;
const tinyY = 242;

const borderColors = (tags: string[]) => {
  if (tags.includes("sky") || tags.includes("beach")) {
    return "blue";
  } else if (tags.includes("animal")) {
    return "yellow";
  } else if (tags.includes("outdoor")) {
    return "green";
  }
  return "gray";
};

const PhotoContainer = styled.div(
  (props: { isEnlarged: boolean | undefined; borderColor: string }) => {
    const { isEnlarged, borderColor } = props;
    return {
      width: isEnlarged ? `${largeX}px` : `${tinyX}px`,
      height: isEnlarged ? `${largeY}px` : `${tinyY}px`,
      borderRadius: "15px",
      borderWidth: "5px",
      borderStyle: "solid",
      borderColor: borderColor,
      overflow: "hidden",
      top: 0,
      left: 0,
      "&:hover": {
        boxShadow: "0px 0px 7px 1px rgba(0,0,0,0.3)",
        transform: "scale(1.02)",
        opacity: 1,
      },
    };
  }
);

const PhotoViewContainer = styled.div(
  (props: { isEnlarged: boolean | undefined }) => {
    const { isEnlarged } = props;
    return {
      width: isEnlarged ? `${largeX + 50}px` : `${tinyX + 50}px`,
      height: isEnlarged ? `${largeY + 50}px` : `${tinyY + 50}px`,
    };
  }
);

const Photo = styled.img({
  width: "100%",
  height: "100%",
});

const Description = styled.div((props: { isEnlarged: boolean | undefined }) => {
  const { isEnlarged } = props;
  return {
    color: "black",
    fontsize: isEnlarged ? "30px" : "12px",
    margin: isEnlarged ? "15px 20px" : "3px 15px",
    width: isEnlarged ? `${largeX - 50}px` : `${tinyX - 50}px`,
  };
});

const Tags = styled.div((props: { isEnlarged: boolean | undefined }) => {
  const { isEnlarged } = props;
  return {
    color: "black",
    size: "9px",
    fontStyle: "italic",
    fontsize: isEnlarged ? "30px" : "12px",
    margin: isEnlarged ? "15px 20px" : "3px 15px",
    width: isEnlarged ? `${largeX - 50}px` : `${tinyX - 50}px`,
  };
});

type PhotoViewProps = {
  img: PhotoType;
  onClick: Function;
  isEnlarged: boolean | undefined;
};

export class PhotoView extends Component<PhotoViewProps> {
  //   constructor(props: PhotoProps) {
  //     super(props);
  //   }
  render() {
    const { img, onClick, isEnlarged } = this.props;
    return (
      <PhotoViewContainer
        onClick={() => {
          if (
            !(
              img.tags.includes("person") ||
              img.tags.includes("people") ||
              img.description.includes("person")
            )
          ) {
            onClick(img);
          }
        }}
        isEnlarged={isEnlarged}
      >
        <PhotoContainer
          isEnlarged={isEnlarged}
          borderColor={borderColors(img.tags)}
        >
          <Photo src={`${img.srcUrl}`} />
        </PhotoContainer>
        <Description isEnlarged={isEnlarged}>{img.description}</Description>
        <Tags isEnlarged={isEnlarged}>{img.tags.join(", ")}</Tags>
      </PhotoViewContainer>
    );
  }
}
