// WordCloudの情報として抽出する品詞（助詞、助動詞などは意味がないので拾わない）
const TARGET_POS = ["名詞", "動詞", "形容詞"];

// kuromoji.jsの解析結果の値で特に値がない場合は以下の文字が設定される
const NO_CONTENT = "*";

const Wordcloud = async (props) => {
  const { data, setData } = props;

  // kuromoji.jsによる解析処理
  // これをゲーム数でmapする
  const words = data.map((item, i) => {
    return item.reviews.map((text) => {
      return new Promise((resolve, reject) => {
        // 辞書を読み混んでトークナイザー（形態素解析するための関数）を生成
        kuromoji
          .builder({
            dicPath: "https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict/",
          })
          .build((err, tokenizer) => {
            if (err) {
              return reject(err);
            }

            // テキストを引数にして形態素解析
            resolve(
              tokenizer
                .tokenize(text.review)
                // pos（品詞）を参照し、'名詞', '動詞', '形容詞'のみを抽出
                .filter((t) => TARGET_POS.includes(t.pos))
                // 単語を抽出(basic_formかsurface_formに単語が存在する)
                .map((t) =>
                  t.basic_form === NO_CONTENT ? t.surface_form : t.basic_form
                )
                // [{text: 単語, value: 出現回数}]の形にReduce
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
    });
  });

  const newReviews = await Promise.all(
    words.map(async (item) => {
      const reviews = await Promise.all(item);
      return reviews.map((value, i) => {
        return { reviews: value, rating: data[0].reviews[i].voted_up };
      });
    })
  );

  const wordcloud = newReviews.map((reviews) => {
    return reviews
      .map((review) => {
        const { rating } = review;
        return review.reviews.map((item) => ({
          text: item.text,
          value: item.value,
          rating: rating,
        }));
      })
      .flat()
      .reduce((acc, word) => {
        const foundWord = acc.find((item) => item.text === word.text);

        if (foundWord) {
          foundWord.value += word.value;
          if (word.rating) {
            foundWord.positive += word.value;
          } else {
            foundWord.negative += word.value;
          }
        } else {
          const newObj = {
            text: word.text,
            value: word.value,
            positive: word.rating ? word.value : 0,
            negative: word.rating ? 0 : word.value,
          };
          acc.push(newObj);
        }
        return acc;
      }, [])
      .sort((a, b) => b.value - a.value)
      .filter((word) => word.text.match(/^\W/) === null && word.text.length > 1)
      .slice(0, 100)
      .map((word) => {
        return {
          text: word.text,
          value: word.value,
          rating: word.positive / (word.positive + word.negative),
        };
      });
  });

  setData(
    data.map((review, index) => {
      return { ...review, wordcloud: wordcloud[index] };
    })
  );
};

export default Wordcloud;
