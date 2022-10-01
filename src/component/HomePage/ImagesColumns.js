import React, { useEffect } from "react";

function ImagesColumns({ photos, RowStyle, gridSize}) {
  let imgBatch = [];
  let photoLength = photos.length;
  let batchSize = Math.ceil(photoLength / gridSize);
  let tempBatch = [];
  let i = 0;
  while (i < photoLength) {
    if (tempBatch.length === batchSize) {
      console.log("batch", i);
      console.log(batchSize);
      imgBatch.push(tempBatch);
      tempBatch = [];
      tempBatch.push(photos[i]);
    } else {
      tempBatch.push(photos[i]);
    }
    i++;
  }
  if (tempBatch.length > 0) {
    let lastCell = [];
    lastCell = imgBatch.length > 0 ? imgBatch[imgBatch.length - 1] : [];
    if (imgBatch.length > 0&&lastCell.length + tempBatch.length <= batchSize) {
      lastCell.push(...tempBatch);
      imgBatch[imgBatch.length - 1] = lastCell;
    } else {
      imgBatch.push(tempBatch);
    }
  }

  useEffect(() => {
    console.log(imgBatch);
  }, []);

  return (
    <>
      {imgBatch.map((item, index) => {
        return (
          <div style={RowStyle} key={index}>
            {item.map((item, index) => {
              return (
                <img
                  key={index}
                  src={item.urls.small}
                  alt={item.alt_description}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default ImagesColumns;
