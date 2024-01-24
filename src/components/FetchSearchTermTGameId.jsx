import jsonData from "./../../gameidData.json";

const FetchSearchTermTGameId = ({ tar, setAddGameId }) => {
  
  try {
    const appList = jsonData.applist.apps;
    const foundApp = appList.find((app) => app.name.toLowerCase() === tar.toLowerCase());

    if (foundApp) {
      setAddGameId(foundApp.appid);
    } else {
      console.error(`App "${tar}" not found.`);
    }
  } catch (error) {
    console.error('Error fetching app data:', error);
  }
};

export default FetchSearchTermTGameId;
