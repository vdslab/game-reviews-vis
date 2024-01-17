import jsonData from "./../../data.json";

const FetchData = (props) => {
  const { setData } = props;
  const gameId = 1097150;
  const GCPurl = "https://us-central1-district-391309.cloudfunctions.net/test";

  const fetchData = async () => {
    try {
      const response = await fetch(GCPurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameId }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      
      console.log(data);
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  fetchData();
};


export default FetchData;
