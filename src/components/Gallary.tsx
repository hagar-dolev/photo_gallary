import React, { Component } from "react";
import styled from "@emotion/styled";

import { PhotoView } from "./PhotoView";
import { PhotoType } from "../types/PhotoType";
import { randomImages } from "../photoGetter";

const GallaryContainer = styled.div({
  width: "100%",
  height: "100%",
  position: "relative",
  flexDirection: "row",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  margin: "20px",
  // alignItems: "center",
  //zIndex: 80,
});

type GallaryProps = {
  imageAmount: number;
};

type GallaryState = {
  photos: PhotoType[];
  enlargedPhoto: PhotoType | undefined;
};

export class Gallary extends Component<GallaryProps, GallaryState> {
  async componentDidMount() {
    const { imageAmount } = this.props;
    const photos: PhotoType[] = await randomImages(imageAmount, 1000, 610);
    this.setState({
      photos: photos,
      enlargedPhoto: undefined,
    });
  }

  handlerEnlarge(photo: PhotoType) {
    this.setState({
      enlargedPhoto: photo,
    });
  }

  handlerClose(photo: PhotoType) {
    this.setState({
      enlargedPhoto: undefined,
    });
  }

  render() {
    if (this.state) {
      const { photos, enlargedPhoto } = this.state;
      return (
        <GallaryContainer>
          {!enlargedPhoto ? (
            photos.map((photo: PhotoType) => {
              return (
                <PhotoView
                  img={photo}
                  isEnlarged={false}
                  onClick={this.handlerEnlarge.bind(this)}
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
        </GallaryContainer>
      );
    }
    return <div />;
  }
}
