import React from "react";

export default function View_images(View_images: any) {
  const ViewImages = ({ images }: any) => {
    return (
      <div>
        {images && images.length > 0 ? (
          images.map((image: any, index: any) => (
            <div key={index}>
              <img
                src={image}
                alt={`Image ${index}`}
                style={{ width: "200px", height: "200px" }}
              />
            </div>
          ))
        ) : (
          <p>No images to display</p>
        )}
      </div>
    );
  };
  return <div>{ViewImages(View_images)}</div>;
}
