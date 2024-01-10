import { useState } from "react";

const Icon = (props) => {
  const { name, header_image, index, setSelectGameIdx } = props;
  const [isHovered, setIsHovered] = useState(false);

  const handleIconClick = () => {
    setSelectGameIdx(index - 1);
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        marginRight: "15px",
        marginTop: "70px",
      }}
    >
      <button
        onClick={handleIconClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          padding: 0,
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          borderRadius: "50%",
          overflow: "hidden",
          width: "50px",
          height: "50px",
        }}
      >
        <img
          src={header_image}
          alt="my image"
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: isHovered ? "brightness(110%)" : "brightness(100%)",
          }}
        />
      </button>
      {isHovered && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            padding: "8px",
            borderRadius: "4px",
            fontSize: "14px",
            zIndex: 9999,
          }}
        >
          {name}
        </div>
      )}
    </div>
  );
};

export default Icon;
