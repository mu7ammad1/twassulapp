function ImageDisplayView({ imageName }: any) {
  return (
    <img
      src={imageName}
      alt={imageName}
      className={`max-h-96 max-md:max-w-64 max-w-96 w-auto h-auto rounded-xl object-fill p-0 m-0 border border-stone-500 border-spacing-4`}
    />
  );
}

export default ImageDisplayView;
