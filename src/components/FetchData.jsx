import jsonData from "./../../data.json";

const FetchData = (props) => {
  const { setData } = props;

  const gameIds = [1063730, 1172470];
  const gameData = {};

  const fetchData = async () => {
    try {
        const gameDataPromises = gameIds.map(async (gameId) => {
          const response = await fetch(`/steam/appreviews/${gameId}?json=1&filter=recent&num_per_page=10`);
          const data = await response.json();
          console.log(data);

          const response2 = await fetch(`/steam/api/appdetails?appids=${gameId}`);
          const data2 = await response2.json();
          console.log(data2);
    
          const extractedData = {
            gameName: data2[gameId].data.name,
            genres: data2[gameId].data ? data2[gameId].data.genres : [],
            header_image: data2[gameId].data ? data2[gameId].data.header_image : "",
            name: data2[gameId].data ? data2[gameId].data.name : "",
            reviews: data.reviews ? data.reviews.map((review) => ({
              review: review.review,
              voted_up: review.voted_up,
            })) : [],
            wordcloud: data.wordcloud ? data.wordcloud : [],
          };
    
          return { [gameId]: extractedData };
        });
  
        const gameDataArray = await Promise.all(gameDataPromises);
        const gameData = gameDataArray.reduce((acc, gameData) => {
          const key = Object.keys(gameData)[0];
          return { ...acc, [key]: gameData[key] };
        }, {});
    
        setData(jsonData);
        console.log(gameData);


        /*steam api */
        // const reviewsResponse  = await fetch("/api/appreviews/1097150?json=1&filter=recent&num_per_page=100");

        // if (!reviewsResponse.ok) {
        //   throw new Error("Network response was not ok");
        // }

        // const data = await reviewsResponse.json();
        // console.log(data);
        // setData(jsonData);



        // /*steam spy */
        // const steamSpyResponse = await fetch("/steamspy/api.php?request=top100in2weeks");
      
        // if (!steamSpyResponse.ok) {
        //   throw new Error("Network response for SteamSpy was not ok");
        // }

        // const steamSpyData = await steamSpyResponse.json();
        // console.log(steamSpyData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
  };
  fetchData();
};

export default FetchData;

