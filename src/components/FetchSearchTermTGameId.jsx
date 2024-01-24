import jsonData from "./../../gameidData.json";

const FetchSearchTermTGameId = ({ tar, setAddGameId, setSearchSuggestions }) => {
  try {
    const appList = jsonData.applist.apps;

    // Find apps that contain the search term as a substring
    const matchingApps = appList.filter((app) =>
      app.name.toLowerCase().includes(tar.toLowerCase())
    );

    const allMatchingApps = appList.find((app) => app.name.toLowerCase() === tar.toLowerCase());

    if (matchingApps.length > 0) {
      // Update the addGameId state and set search suggestions
      setAddGameId(allMatchingApps.appid); // Use the first matching appid as an example
      setSearchSuggestions(matchingApps.map((app) => app.name));
    } else {
      console.error(`No app found containing "${tar}".`);
      // Clear search suggestions when no matching app is found
      setSearchSuggestions([]);
    }
  } catch (error) {
    console.error('Error fetching app data:', error);
  }
};


export default FetchSearchTermTGameId;
