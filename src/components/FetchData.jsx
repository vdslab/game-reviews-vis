import jsonData from "./../../data.json";
import Wordcloud from "./Wordcloud";

const FetchData = (props) => {
  /* (async () => {
    const reviewsResponse = await fetch("https://steamspy.com/api.php");

    if (!reviewsResponse.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await reviewsResponse.json();
    console.log(data);
  })();

  (async () => {
    const reviewsResponse = await fetch(
      "https://store.steampowered.com/appreviews/1097150?json=1&filter=recent&num_per_page=100"
    );

    if (!reviewsResponse.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await reviewsResponse.json();
    console.log(data);
  })(); */
  const { setData } = props;

  const gameIds = [1063730, 1172470];
  const gameData = {};

  const fetchData = async () => {
    try {
      const gameDataPromises = gameIds.map(async (gameId) => {
        const steamReviewsResponse = await fetch(
          `/steam/appreviews/${gameId}?json=1&filter=recent&num_per_page=10`
        );
        const steamReviewsData = await steamReviewsResponse.json();
        // console.log(steamReviewsData);

        const steamDetailsResponse = await fetch(
          `/steam/api/appdetails?appids=${gameId}`
        );
        const steamDetailsData = await steamDetailsResponse.json();
        // console.log(data2);

        const extractedData = {
          gameName: steamDetailsData[gameId].data.name,
          genres: steamDetailsData[gameId].data
            ? steamDetailsData[gameId].data.genres
            : [],
          // genres: data2[gameId]?.data?.genres?.map((genre) => genre.description) || [],
          header_image: steamDetailsData[gameId].data
            ? steamDetailsData[gameId].data.header_image
            : "",
          name: steamDetailsData[gameId].data
            ? steamDetailsData[gameId].data.name
            : "",
          reviews: steamReviewsData.reviews
            ? steamReviewsData.reviews.map((review) => ({
                review: review.review,
                voted_up: review.voted_up,
              }))
            : [],
          wordcloud: steamReviewsData.wordcloud
            ? steamReviewsData.wordcloud
            : [],
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
};

export default FetchData;
