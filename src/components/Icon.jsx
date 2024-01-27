import { useState } from "react";

const Icon = (props) => {
  const { name, header_image, index, setSelectGameIdx } = props;
  const [isHovered, setIsHovered] = useState(false);

  const handleIconClick = () => {
    setSelectGameIdx(index);
  };

  function getTextWidth(text, fontSize) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = fontSize;
    const metrics = context.measureText(text);
    return metrics.width;
  }

  return (
    <g
      onClick={() => handleIconClick()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: "pointer" }}
    >
      <defs>
        <clipPath id={`clip-${index}`}>
          <circle r={30} />
        </clipPath>
      </defs>
      <image
        href={header_image}
        width={75}
        height={60}
        x={-37.5}
        y={-30}
        clipPath={`url(#clip-${index})`}
      />
      {isHovered && (
        <g>
          <rect
            x={-getTextWidth(name, "14px") / 2 - 25}
            y={20}
            width={getTextWidth(name, "14px") + 50}
            height={30}
            fill="black"
          ></rect>

          <text
            x={0}
            y={40}
            textAnchor="middle"
            fill="white"
            fontSize="14px"
            pointerEvents="none"
          >
            {name}
          </text>
        </g>
      )}
    </g>
  );
};

export default Icon;
