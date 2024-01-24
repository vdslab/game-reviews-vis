import { useState } from "react";

const Icon = (props) => {
  const { name, header_image, index, setSelectGameIdx } = props;
  const [isHovered, setIsHovered] = useState(false);

  const handleIconClick = () => {
    setSelectGameIdx(index - 1);
  };

  //console.log(props);

  return (
    <image
      href={header_image}
      alt="my image"
      style={{
        width: "50px",
        height: "50px",
        /* objectFit: "cover", */
        borderRadius: "80%",
        overflow: "hidden",
        filter: isHovered ? "brightness(110%)" : "brightness(100%)",
      }}
      onClick={handleIconClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};

export default Icon;
