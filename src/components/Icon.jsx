import { useState } from "react";

const Icon = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const imagePng =
    "https://cdn.akamai.steamstatic.com/steam/apps/1097150/header.jpg?t=1698763175";

  const gameTitle = "Fall Guys";

  const handleIconClick = () => {
    console.log("クリックされました");
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={handleIconClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        style={{
          padding: 0,
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          borderRadius: "50%",
          overflow: "hidden",
          width: "100px",
          height: "100px",
        }}
      >
        <img
          src={imagePng}
          alt="my image"
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </button>
      {showTooltip && (
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
          }}
        >
          {gameTitle}
        </div>
      )}
    </div>
  );
};

export default Icon;
