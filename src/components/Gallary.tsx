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
  padding: "10px",
});

const LoadingView = styled.div({
  display: "flex",
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
});

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
        <LoadingView>
          <div>Loading...</div>
        </LoadingView>
      );
    }

    return (
      <GallaryContainer>
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
      </GallaryContainer>
    );
  }
}
