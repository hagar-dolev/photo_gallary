import React, { Component } from "react";
import { PhotoType } from "../types/PhotoType";

const borderColors = (tags: string[] | undefined) => {
  if (tags === undefined) {
    return "border-secondary";
  }
  if (tags.includes("sky") || tags.includes("beach")) {
    return "border-primary";
  } else if (tags.includes("animal")) {
    return "border-danger";
  } else if (tags.includes("outdoor")) {
    return "border-success";
  }
  return "border-secondary";
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
        className={
          isEnlarged
            ? "mx-auto col-xl col-md-6"
            : `col-xl-3 col-lg-4 col-md-6 mb-4`
        }
        onClick={onClick}
      >
        <div
          className={`bg-white rounded shadow-sm rounded border ${
            isEnlarged ? "" : borderColors(img.tags)
          }`}
        >
          <img className="card-img-top" src={`${img.srcUrl}`} alt="" />
          <div className="p-4">
            <div className="text-dark">{img.description}</div>
            <div className={`small d-flex flex-wrap align-content-around `}>
              {img.tags?.map((tag) => {
                return (
                  <span className="m-1 badge badge-secondary rounded-pill font-weight-normal">
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
