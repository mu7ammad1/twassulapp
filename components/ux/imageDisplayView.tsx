function ImageDisplayView({ imageName }: any) {
  return (
    <img
      src={imageName}
      alt={imageName}
      className={`max-h-full max-w-96 max-md:max-w-72 w-full h-full rounded-xl object-cover p-0 m-0`}
    />
  );
}

export default ImageDisplayView;
