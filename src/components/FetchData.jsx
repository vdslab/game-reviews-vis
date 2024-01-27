import jsonData from "./../../data.json";
import { TfIdf } from "./TfIdf";

const FetchData = (props) => {
  const { data, setData, addData, setSelectGameIdx, setAddDataNum } = props;

  const fetchData = async (gameId) => {
    try {
      const gameDataPromise = async () => {
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
      };

      const gameData = await gameDataPromise();

      // const gameData = gameDataArray
      //   .reduce((acc, gameData) => {
      //     acc.push(gameData);
      //     return acc;
      //   }, [])
      //   .filter((e) => e);

      if (gameData) {
        return { ...gameData, TFIDF: TfIdf(gameData) };
      }

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

  (async () => {
    if (data.length === 0) {
      const gameIds = jsonData.appid;
      const dataPromise = gameIds.map((gameId) => {
        return fetchData(gameId);
      });
      const dataResult = await Promise.all(dataPromise);
      const filterData = dataResult.filter((e) => e).slice(0, 50);
      setData(filterData);
    } else {
      const gameId = parseInt(addData, 10);
      const dataResult = await fetchData(gameId);
      if (!dataResult) return;
      setData([dataResult, ...data]);
      // setAddDataNum(data.length - jsonData.appid.length);
    }
  })();
};

export default FetchData;
