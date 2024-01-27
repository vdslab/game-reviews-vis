import jsonData from "./../../gameidData.json";

const FetchSearchTermTGameId = ({
  tar,
  setAddGameId,
  setSearchSuggestions,
}) => {
  try {
    const appList = jsonData.applist.apps;

    const matchingApps = appList.filter((app) =>
      app.name.toLowerCase().includes(tar.toLowerCase())
    );

    const allMatchingApps = appList.find(
      (app) => app.name.toLowerCase() === tar.toLowerCase()
    );

    if (matchingApps.length > 0) {
      if(allMatchingApps){
        setAddGameId(allMatchingApps.appid);
        // setSearchSuggestions(matchingApps.map((app) => app.name));
        setSearchSuggestions([allMatchingApps.name, ...matchingApps.map((app) => app.name)]);
      }else{
        // setSearchSuggestions([...matchingApps.map((app) => app.name)]);
        setSearchSuggestions(
          [...matchingApps]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((app) => app.name)
        );
        
      }
    } else {
      console.error(`No app found containing "${tar}".`);
      setSearchSuggestions([]);
    }
  } catch (error) {
    console.error("Error fetching app data:", error);
  }
};

export default FetchSearchTermTGameId;
