function ImageDisplayView({ imageName }: any) {
  return (
    <img
      src={imageName}
      alt={imageName}
      className={`max-h-72 rounded-xl object-fill p-0 m-0`}
    />
  );
}

export default ImageDisplayView;
