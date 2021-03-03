import React, { Component } from "react";

import { PhotoView } from "./PhotoView";
import { PhotoType } from "../types/PhotoType";
import { randomImages } from "../photoGetter";
import "./gallary.css";

type GallaryProps = {
  imageAmount: number;
};

type GallaryState = {
  photos: PhotoType[];
  enlargedPhoto: PhotoType | undefined;
};

export class Gallary extends Component<GallaryProps, GallaryState> {
  constructor(props: GallaryProps) {
    super(props);
    this.state = {
      photos: [],
      enlargedPhoto: undefined,
    };
  }

  componentDidMount() {
    const { imageAmount } = this.props;
    randomImages(imageAmount, 1000, 610).then((photos) => {
      this.setState({ photos });
    });
  }

  handlerEnlarge(photo: PhotoType) {
    this.setState({
      enlargedPhoto: photo,
    });
  }

  handlerClose() {
    this.setState({
      enlargedPhoto: undefined,
    });
  }

  render() {
    const { photos, enlargedPhoto } = this.state;

    if (photos.length === 0) {
      return (
        <div className="loadingView">
          <div>Loading...</div>
        </div>
      );
    }

    return (
      <div className="gallaryContainer">
        {!enlargedPhoto ? (
          photos.map((photo: PhotoType) => {
            return (
              <PhotoView
                img={photo}
                isEnlarged={false}
                onClick={() => {
                  if (
                    !(
                      photo.tags?.includes("person") ||
                      photo.tags?.includes("people") ||
                      photo.description?.includes("person")
                    )
                  ) {
                    this.handlerEnlarge.bind(this)(photo);
                  }
                }}
              ></PhotoView>
            );
          })
        ) : (
          <PhotoView
            img={enlargedPhoto}
            isEnlarged={true}
            onClick={this.handlerClose.bind(this)}
          ></PhotoView>
        )}
      </div>
    );
  }
}
