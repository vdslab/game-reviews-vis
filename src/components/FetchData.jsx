import jsonData from "./../../data.json";
import Wordcloud from "./Wordcloud";

const FetchData = (props) => {
  const { setData, addData, setSelectGameIdx } = props;

  let gameIds;
  if (addData == 0) {
    gameIds = jsonData.appid;
  } else {
    gameIds = [...jsonData.appid, parseInt(addData, 10)];
  }
  // const gameIds = jsonData.appid;

  const fetchData = async () => {
    try {
      const gameDataPromises = gameIds.map(async (gameId) => {
        const steamReviewsResponse = await fetch(
          `/steam/appreviews/${gameId}?json=1&filter=recent&num_per_page=50&language=english`
        );
        const steamReviewsData = await steamReviewsResponse.json();

        const steamDetailsResponse = await fetch(
          `/steam/api/appdetails?appids=${gameId}&language=english`
        );

        const steamDetailsData = await steamDetailsResponse.json();

        if (!steamDetailsData[gameId].success) return;

        const extractedData = {
          name: steamDetailsData[gameId].data.name,
          genres: steamDetailsData[gameId].data
            ? steamDetailsData[gameId].data.genres
            : [],
          header_image: steamDetailsData[gameId].data
            ? steamDetailsData[gameId].data.header_image
            : "",
          reviews: steamReviewsData.reviews
            ? steamReviewsData.reviews.map((review) => ({
                review: review.review,
                voted_up: review.voted_up,
              }))
            : [],
        };
        
        return extractedData;
      });

      const gameDataArray = await Promise.all(gameDataPromises);

      const gameData = gameDataArray
        .reduce((acc, gameData) => {
          acc.push(gameData);
          return acc;
        }, [])
        .filter((e) => e);

      Wordcloud({ data: gameData, setData });

      /* steam api */
      // const reviewsResponse  = await fetch("/api/appreviews/1097150?json=1&filter=recent&num_per_page=100");

      // if (!reviewsResponse.ok) {
      //   throw new Error("Network response was not ok");
      // }

      // const data = await reviewsResponse.json();
      // console.log(data);
      // setData(jsonData);

      /*steam spy */
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

  // if (addData == 0) {
  // } else {
  //   setSelectGameIdx(gameIds.length-1);
  // }
};

export default FetchData;
