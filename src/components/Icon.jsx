const Icon = () => {
  const image_png =
    "https://cdn.akamai.steamstatic.com/steam/apps/1097150/header.jpg?t=1698763175";

  const handleIconClick = () => {
    console.log("クリックされました");
  };

  return (
    <button
      onClick={handleIconClick}
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
        src={image_png}
        alt="my image"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </button>
  );
};

export default Icon;
