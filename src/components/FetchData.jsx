import Wordcloud from "./Wordcloud";

const FetchData = (props) => {
  const { gameCount, setData } = props;
  const spyurl =
    "https://us-central1-district-391309.cloudfunctions.net/steam_game_ranking";
  const url =
    "https://us-central1-district-391309.cloudfunctions.net/test/request=1097150";

  const data = new Array(gameCount).fill({
    genres: ["Action", "Casual", "Indie", "Massively Multiplayer", "Sports"],
    header_image:
      "https://cdn.akamai.steamstatic.com/steam/apps/1097150/header.jpg?t=1698763175",
    name: "Fall Guys",
    reviews: [
      {
        review: "epic game not so epic",
        voted_up: false,
      },
      {
        review: "983 hours",
        voted_up: true,
      },
      {
        review:
          "This is a bad game. Try content creation for more than fifteen minutes if you don't believe me and you will understand. Heed my warning, those of you who are wise, and do something that brings you genuine joy instead. The people who still play this game are afflicted souls who will never find peace. Screw the devs and all those in the playerbase who make this game a living hell. God bless you and have a great day!",
        voted_up: false,
      },
      {
        review: "good",
        voted_up: true,
      },
      {
        review: "yes",
        voted_up: true,
      },
      {
        review: "yes",
        voted_up: true,
      },
      {
        review:
          "cool game, but if you lose and dont hit exit in the first 1 sec, you have to stay and watch for another 60 seconds while it loads and doesn't let you leave. then you have to spam click through a bunch of rewards that takes forever.\n\noverall good and fun party game, boring to exit and start the next round",
        voted_up: true,
      },
      {
        review: "pc crash",
        voted_up: false,
      },
      {
        review: "nn",
        voted_up: true,
      },
      {
        review: "its a nice game that i play ever day",
        voted_up: true,
      },
      {
        review: "its good when your bored",
        voted_up: true,
      },
      {
        review: "u are all niggers\n",
        voted_up: false,
      },
      {
        review: "garbage",
        voted_up: false,
      },
      {
        review: "kk",
        voted_up: true,
      },
      {
        review: "Needs more Miku skins",
        voted_up: false,
      },
      {
        review:
          "Terrible customer support. When they launched this game it had all sorts of technical problems on my machine that made it unplayable. I went to the effort of recording footage of the problems and sharing it the devs so they could improve their product and asked for a refund. They refused to give me a refund because I'd played for slightly too long. I wish I hadn't gone to the effort to help them improve their product. Won't be buying anything from them again.",
        voted_up: false,
      },
      {
        review: "i fell :(",
        voted_up: true,
      },
      {
        review: "nice",
        voted_up: true,
      },
      {
        review: "mess with your friends - The Game",
        voted_up: true,
      },
      {
        review: "Fun",
        voted_up: true,
      },
      {
        review: "hbb",
        voted_up: true,
      },
      {
        review: "This game fell off guys",
        voted_up: false,
      },
      {
        review: "yes sir",
        voted_up: true,
      },
      {
        review: "yes\n",
        voted_up: true,
      },
      {
        review: "نسىينتسىتنبي",
        voted_up: true,
      },
      {
        review: "woo",
        voted_up: true,
      },
      {
        review: "I'm crowningggggg!!!!!!!!!!!!",
        voted_up: true,
      },
      {
        review: "Really fun game and would be enjoyable with friends too!",
        voted_up: true,
      },
      {
        review: "FUCK EPIC GAMES",
        voted_up: false,
      },
      {
        review: "beans",
        voted_up: true,
      },
      {
        review: "Super fun. May end all your friendships though",
        voted_up: true,
      },
      {
        review: "I love fall guyds plz down load its fiyah 🔥🔥🔥",
        voted_up: true,
      },
      {
        review:
          "The game consists of creative and fun mini-games that take some skill, but not to the point where you have to be anymore than a casual player.",
        voted_up: true,
      },
      {
        review: "very fun game if you have very shot amount of time",
        voted_up: true,
      },
      {
        review: "Epic dont add witcher please 🙏",
        voted_up: true,
      },
      {
        review: "This game was dead on arrival can't believe i bought it",
        voted_up: false,
      },
      {
        review: "chutioya giri game hai",
        voted_up: false,
      },
      {
        review: "it funxs",
        voted_up: true,
      },
      {
        review: "they look like among us hehe",
        voted_up: true,
      },
      {
        review:
          "This game never stopped being fun, it just gets repetitive. I quit for a while then get hooked again for another few weeks, and it's been like that since the game's release. I try to get my friends to play it and they decline because it \"died\" but its not true, so many people play this game still",
        voted_up: true,
      },
      {
        review: "i have fall all the guys",
        voted_up: true,
      },
      {
        review: "Crashes on Linux after 2 mins",
        voted_up: false,
      },
      {
        review: ":)",
        voted_up: true,
      },
      {
        review: "good",
        voted_up: true,
      },
      {
        review: "game is so fun\n",
        voted_up: true,
      },
      {
        review: "it is fun lol\n",
        voted_up: true,
      },
      {
        review: "Best game",
        voted_up: true,
      },
      {
        review:
          "A great casual game to play with friends and family, especially if they dont play games often.",
        voted_up: true,
      },
      /*       {
        review: "fun\n",
        voted_up: true,
      },
      {
        review: "hi",
        voted_up: true,
      },
      {
        review: "yh",
        voted_up: true,
      },
      {
        review: " no",
        voted_up: false,
      },
      {
        review: "Fun with friends",
        voted_up: true,
      },
      {
        review: "sick",
        voted_up: true,
      },
      {
        review: " Fall guys is fun as shit.",
        voted_up: true,
      },
      {
        review: "nice\n",
        voted_up: true,
      },
      {
        review:
          "hgdfgsedfeuiwrfhghghhghhrsghsdgketguytyrutrejhgjfhgjhahgjkhfdshgjkagiytaqo3wyt4rhtaerhtrghfjhjakgfhdjgkhruythgjskdfhg\n",
        voted_up: true,
      },
      {
        review: "its  good",
        voted_up: true,
      },
      {
        review: "good game!",
        voted_up: true,
      },
      {
        review: "curry",
        voted_up: true,
      },
      {
        review: "this is an awesome game i love to play this with my friends",
        voted_up: true,
      },
      {
        review: "fun game",
        voted_up: true,
      },
      {
        review: "It is a fun unstressful game.",
        voted_up: true,
      },
      {
        review:
          "Apesar de terem largado no suporte ao jogo, é viciante e divertido",
        voted_up: true,
      },
      {
        review: "benis",
        voted_up: true,
      },
      {
        review: "fun with friends",
        voted_up: true,
      },
      {
        review: "Hi",
        voted_up: true,
      },
      {
        review:
          "this game is fun to play game is fun to play with friends and by yourself",
        voted_up: true,
      },
      {
        review: "its funny to play",
        voted_up: true,
      },
      {
        review: "because it's fun.",
        voted_up: true,
      },
      {
        review: "weeeeee",
        voted_up: true,
      },
      {
        review: "Good game",
        voted_up: true,
      },
      {
        review: "I don't like the movement",
        voted_up: false,
      },
      {
        review: "I Like It",
        voted_up: true,
      },
      {
        review: "epic game bad",
        voted_up: false,
      },
      {
        review: "ZSDC",
        voted_up: false,
      },
      {
        review: "Fuck off EPIC",
        voted_up: false,
      },
      {
        review: "I jumped too hard i turned into a mogusssss.",
        voted_up: true,
      },
      {
        review:
          "Doesnt work on steam anymore, Tells to check games files and thats it cant go past that screen any more",
        voted_up: false,
      },
      {
        review: "Everything!",
        voted_up: true,
      },
      {
        review: "it fun to play with friends\n",
        voted_up: true,
      },
      {
        review: "It's a bit difficult but a really good game",
        voted_up: true,
      },
      {
        review: "another good game killed by epic games Sadge",
        voted_up: false,
      },
      {
        review:
          "FUN \nSTUPID \nFUNNY \nYOU MIGHT LOSE SOME FRIENDS IN REAL LIFE \n",
        voted_up: true,
      },
      {
        review: "happy little game",
        voted_up: true,
      },
      {
        review: "Wheres sex update?",
        voted_up: false,
      },
      {
        review: "On foe nem",
        voted_up: true,
      },
      {
        review:
          "this game fulfills my human instinct to be a gameshow contestant",
        voted_up: true,
      },
      {
        review: "good",
        voted_up: true,
      },
      {
        review: "BWEENZ",
        voted_up: true,
      },
      {
        review:
          "Love not being able to play the game from steam anymore, it's the best thing ever.",
        voted_up: false,
      },
      {
        review: "fun game to just chill and play",
        voted_up: true,
      },
      {
        review: "PLATFOMER\n",
        voted_up: true,
      },
      {
        review:
          "This game is a fun and fast paced race to the finish! You can choose your jellybean's color, outfit and skin combo with new choices added daily!",
        voted_up: true,
      },
      {
        review:
          "it's a very fun and competitive game! I do get really frustrated at some points but overall its awesome.",
        voted_up: true,
      },
      {
        review: "Best time pss game",
        voted_up: true,
      },
      {
        review: "this is a good game",
        voted_up: true,
      },
      {
        review: "tub bae",
        voted_up: true,
      },
      {
        review: "its good to be back and relax sometime",
        voted_up: true,
      },
      {
        review:
          "Reminds me of the old TV show Takeshi Castle. Fun to play with friends and cute art",
        voted_up: true,
      },*/
    ],
  });

  /* const fetchData = async () => {
    try {
      const response = await fetch(spyurl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }; */

  //fetchData();
  setData(data);
  //Wordcloud({ data, setData });
};

export default FetchData;
