
const FetchSearchTermTGameId = ({ tar, addGameId }) => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        '/steamv2/ISteamApps/GetAppList/v2/'
      );
      const data = await response.json();

      const gameList = data.applist.apps;

      const targetGame = gameList.find((game) => game.name === tar);

      if (targetGame) {
        addGameId(targetGame.appid);
      } else {
        console.error(`error`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
};

export default FetchSearchTermTGameId;
