import { useState } from "react";

const Icon = (props) => {
  const { name, header_image, index, setSelectGameIdx } = props;
  const [isHovered, setIsHovered] = useState(false);

  const handleIconClick = () => {
    setSelectGameIdx(index);
  };

  return (
    <g
      onClick={() => handleIconClick()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <defs>
        <clipPath id={`clip-${index}`}>
          <circle r={17} />
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
      {/* {isHovered && (
        <rect x={-37.5} y={-30} width={75} height={60} fill="lightgray">
          <text
            x={0}
            y={60}
            textAnchor="middle"
            fill="#fff"
            fontSize="14px"
            pointerEvents="none"
          >
            {name}
          </text>
        </rect>
      )} */}
    </g>
  );
};

export default Icon;
