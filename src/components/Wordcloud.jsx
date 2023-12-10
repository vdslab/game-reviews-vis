const text =
  "yes yes cool game, but if you lose and dont hit exit in the first 1 sec, you have to stay and watch for another 60 seconds while it loads and doesn't let you leave. then you have to spam click through a bunch of rewards that takes forever.overall good and fun party game, boring to exit and start the next round pc crash nn its a nice game that i play ever day its good when your bored u are all niggersgarbage kk Needs more Miku skins Terrible customer support. When they launched this game it had all sorts of technical problems on my machine that made it unplayable. I went to the effort of recording footage of the problems and sharing it the devs so they could improve their product and asked for a refund. They refused to give me a refund because I'd played for slightly too long. I wish I hadn't gone to the effort to help them improve their product. Won't be buying anything from them again. i fell :( nice mess with your friends - The Game Fun hbb This game fell off guys yes sir yes نسىينتسىتنبي woo I'm crowningggggg!!!!!!!!!!!! Really fun game and would be enjoyable with friends too! FUCK EPIC GAMES beans Super fun. May end all your friendships though I love fall guyds plz down load its fiyah 🔥🔥🔥 The game consists of creative and fun mini-games that take some skill, but not to the point where you have to be anymore than a casual player. very fun game if you have very shot amount of time Epic dont add witcher please 🙏 This game was dead on arrival can't believe i bought it chutioya giri game hai it funxs they look like among us hehe This game never stopped being fun, it just gets repetitive. I quit for a while then get hooked again for another few weeks, and it's been like that since the game's release. I try to get my friends to play it and they decline because it died but its not true, so many people play this game still i have fall all the guys Crashes on Linux after 2 mins :) good game is so funit is fun lolBest game A great casual game to play with friends and family, especially if they dont play games often. funhi yh  no Fun with friends sick  Fall guys is fun as shit. nice hgdfgsedfeuiwrfhghghhghhrsghsdgketguytyrutrejhgjfhgjhahgjkhfdshgjkagiytaqo3wyt4rhtaerhtrghfjhjakgfhdjgkhruythgjskdfhg its  good good game! curry this is an awesome game i love to play this with my friends fun game It is a fun unstressful game. Apesar de terem largado no suporte ao jogo, é viciante e divertido benis fun with friends Hi this game is fun to play game is fun to play with friends and by yourself its funny to play because it's fun. weeeeee Good game I don't like the movement I Like It epic game bad ZSDC Fuck off EPIC I jumped too hard i turned into a mogusssss. Doesnt work on steam anymore, Tells to check games files and thats it cant go past that screen any more Everything! it fun to play with friends It's a bit difficult but a really good game another good game killed by epic games Sadge FUN STUPID FUNNY YOU MIGHT LOSE SOME FRIENDS IN REAL LIFE happy little game Wheres sex update? On foe nem this game fulfills my human instinct to be a gameshow contestant good BWEENZ Love not being able to play the game from steam anymore, it's the best thing ever. fun game to just chill and play PLATFOMER This game is a fun and fast paced race to the finish! You can choose your jellybean's color, outfit and skin combo with new choices added daily! it's a very fun and competitive game! I do get really frustrated at some points but overall its awesome. Best time pss game this is a good game tub bae its good to be back and relax sometime Reminds me of the old TV show Takeshi Castle. Fun to play with friends and cute art This is a game about being the last one standing or first to cross a finish line. Simple as that. Or it was before the modders were allow access to torment you for daring to complete their maddening maps! It is a fun game that is blissfully free of the toxicity of other games by not having a chat function in game. It allows you, the player, to focus on the game. I have played this game Since at least season 2 or 3, I don't remember exactly. As of writing this I have played this for 1,670 hours and several minutes. Even though I did get all the achievements, Before Epic Games took over!, I still enjoy playing this game. Not everyone will enjoy this as much as I have, but I am pleased to say that this game is still receiving new maps to play every couple of months. Or as of this post every few days thanks to personally created maps by other players which have become so popular that some got added into the game for others to play! I hope this is enough to convince you to join me and others in playing this games. Sure you may fall in this game, but you can always try again in Fall Guys: Ultimate Knockout.... Old and likely original name back when News seasons meant something for this game. fun and not super sweaty Best game for relax wajow 5 uroe";

// WordCloudの情報として抽出する品詞（助詞、助動詞などは意味がないので拾わない）
const TARGET_POS = ["名詞", "動詞", "形容詞"];

// kuromoji.jsの解析結果の値で特に値がない場合は以下の文字が設定される
const NO_CONTENT = "*";

const Wordcloud = async (prop) => {
  const setWordsData = prop;
  // kuromoji.jsによる解析処理
  const words = await new Promise((resolve, reject) => {
    // 辞書を読み混んでトークナイザー（形態素解析するための関数）を生成
    kuromoji
      .builder({ dicPath: "https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict/" })
      .build((err, tokenizer) => {
        if (err) {
          return reject(err);
        }

        // テキストを引数にして形態素解析
        resolve(
          tokenizer
            .tokenize(text)
            // pos（品詞）を参照し、'名詞', '動詞', '形容詞'のみを抽出
            .filter((t) => TARGET_POS.includes(t.pos))
            // 単語を抽出(basic_formかsurface_formに単語が存在する)
            .map((t) =>
              t.basic_form === NO_CONTENT ? t.surface_form : t.basic_form
            )
            // [{text: 単語, size: 出現回数}]の形にReduce
            .reduce((data, text) => {
              const target = data.find((c) => c.text === text);

              if (target) {
                target.value = target.value + 1;
              } else {
                data.push({
                  text,
                  value: 1,
                });
              }
              return data;
            }, [])
        );
      });
  });

  words.sort((a, b) => b.value - a.value);
  const sortWords = words
    .filter((word) => word.text.match(/^\W/) === null && word.text.length > 1)
    .slice(0, 100);

  setWordsData({ data: sortWords });
};

export default Wordcloud;
