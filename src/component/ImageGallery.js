import "../styles/ImageGallery.css";
import React from "react";
import ImageBox from "./ImageBox";
import configData from "../config/config.json";

function ImageGallery() {
  const imagesPath = require.context("../images", true);
  const imageList = imagesPath.keys().map((image) => imagesPath(image));
  imageList.sort(compareUsingImageDims);

  const items = convertImagesToItems(imageList);
  const imageRows = groupImageIntoRows(
    imageList,
    configData.layout.numOfColumns
  );

  function renderImagesInRow(imageRow) {
    return (
      <div key={imageRow} className="img-row">
        {imageRow.map((image, index) => renderImage(image, index))}
      </div>
    );
  }

  function renderImage(image, index) {
    const isImagePresent = image;
    if (!isImagePresent) {
      return <div key={`row-${index}`} className="img-col" />;
    } else {
      const item = items.find((item) => item.name === image);
      return (
        <div key={item.name} className="img-col">
          <ImageBox imageName={item.name} index={index} />
        </div>
      );
    }
  }

  return (
    <div className="img-gallery">
      {imageRows.map((imageRow) => renderImagesInRow(imageRow))}
    </div>
  );
}

function compareUsingImageDims(first, second) {
  const storedDimFirst = localStorage.getItem(`collage-${first}`);
  const storedDimSecond = localStorage.getItem(`collage-${second}`);
  if (storedDimFirst && storedDimSecond) {
    const firstDim = JSON.parse(storedDimFirst);
    const secondDim = JSON.parse(storedDimSecond);
    if (firstDim.height < secondDim.height) {
      return -1;
    }
    if (firstDim.height > secondDim.height) {
      return 1;
    }
  }
  return 0;
}

function convertImagesToItems(imageList) {
  const imageItems = [];
  imageList.map((image) =>
    imageItems.push({
      name: image,
    })
  );
  return imageItems;
}

var groupImageIntoRows = (array, chunkSize) => {
  const imageRows = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    if (chunk.length < chunkSize) {
      const emptySlots = chunkSize - chunk.length;
      for (let i = 0; i < emptySlots; i++) {
        chunk.push(null);
      }
    }
    imageRows.push(chunk);
  }
  return imageRows;
};

export default ImageGallery;
