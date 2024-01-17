import jsonData from "./../../data.json";

const FetchData = (props) => {
  const { setData } = props;

  const fetchData = async () => {
    try {
      /*steam api */
      const reviewsResponse  = await fetch("/api/appreviews/1097150?json=1&filter=recent&num_per_page=100");

      if (!reviewsResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await reviewsResponse.json();
      console.log(data);
      setData(jsonData);



      /*steam spy */
      const steamSpyResponse = await fetch("/steamspy/api.php?request=top100in2weeks");
    
      if (!steamSpyResponse.ok) {
        throw new Error("Network response for SteamSpy was not ok");
      }

      const steamSpyData = await steamSpyResponse.json();
      console.log(steamSpyData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  fetchData();
};


// const FetchData = (props) => {
//   const { setData } = props;
//   const gameId = 1097150;
//   const GCPurl = "https://us-central1-district-391309.cloudfunctions.net/test";

//   const fetchData = async () => {
//     try {
//       const response = await fetch(GCPurl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ gameId }),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();
      
//       console.log(data);
//       setData(jsonData);
//     } catch (error) {
//       console.error("Error fetching data:", error.message);
//     }
//   };

//   fetchData();
// };


export default FetchData;

