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
  const data = jsonData;
  console.log(data);

  Wordcloud({ data, setData });
};

export default FetchData;
