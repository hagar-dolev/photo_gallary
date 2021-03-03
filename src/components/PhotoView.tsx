import React, { Component } from "react";
import { PhotoType } from "../types/PhotoType";
import "./photoview.css";

const borderColors = (tags: string[] | undefined) => {
  if (tags === undefined) {
    return "";
  }
  if (tags.includes("sky") || tags.includes("beach")) {
    return "Border-Blue";
  } else if (tags.includes("animal")) {
    return "Border-Yellow";
  } else if (tags.includes("outdoor")) {
    return "Border-Green";
  }
  return "";
};

type PhotoViewProps = {
  img: PhotoType;
  onClick: () => void;
  isEnlarged: boolean | undefined;
};

export class PhotoView extends Component<PhotoViewProps> {
  render() {
    const { img, onClick, isEnlarged } = this.props;
    return (
      <div
        className={`PhotoViewContainer${
          isEnlarged ? " PhotoViewContainer-Enlarged" : ""
        }`}
        onClick={onClick}
      >
        <div
          className={`PhotoContainer${
            isEnlarged ? " PhotoContainer-Enlarged" : ""
          }${" " + borderColors(img.tags)}`}
        >
          <img className="Photo" src={`${img.srcUrl}`} alt="" />
        </div>
        <div className={`Text${isEnlarged ? " Large-Regular-Text" : ""}`}>
          {img.description}
        </div>
        <div
          className={`Text Tag-Text${isEnlarged ? " Tag-Text-Enlarged" : ""}`}
        >
          {img.tags?.join(", ") ?? ""}
        </div>
      </div>
    );
  }
}
