import jsonData from "./../../data.json";

const FetchData = (props) => {
  const { setData } = props;
  const data = jsonData;

  setData(data);
};

// const FetchData = ({ setData }) => {
//   const fetchData = async () => {
//     try {
//       const response = await fetch(
//         "https://api.steampowered.com/ISteamApps/GetAppList/v2/"
//       );
//       const data = await response.json();

//       // Assuming the data structure includes an 'applist' property with 'apps' array
//       const gameList = data.applist.apps;

//       // Find the game with the name "Fall Guys"
//       const fallGuysGame = gameList.find((game) => game.name === "Fall Guys");

//       // Set the data to the found game or handle the case when the game is not found
//       if (fallGuysGame) {
//         setData(fallGuysGame);
//       } else {
//         console.error("Fall Guys not found in the game list.");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchData();
// };

export default FetchData;
