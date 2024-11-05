function ImageDisplayView({ imageName }: any) {
  return (
    <img
      src={imageName}
      alt={imageName}
      className={`max-h-80 max-w-[484px] max-md:max-w-80 w-full h-full rounded-xl object-cover p-0 m-0 border border-stone-500 border-spacing-4`}
    />
  );
}

export default ImageDisplayView;
