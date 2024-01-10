import jsonData from "./../../data.json";

const FetchData = (props) => {
  const { setData } = props;
  const data = jsonData;

  setData(data);
};

export default FetchData;
