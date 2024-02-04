import Image from "next/image";

const ImageComponent = ({ imageUrl }) => {
  return (
    <div className="cursor-pointer w-full h-full">
      <Image
        src={imageUrl}
        alt="no_image"
        width={144}
        height={144}
        className="rounded-full inline-block shadow-xl hover:shadow-2xl object-cover "
      />
    </div>
  );
};

export default ImageComponent;
