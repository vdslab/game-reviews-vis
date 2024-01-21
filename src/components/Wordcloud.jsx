const Wordcloud = (props) => {
  const { data, setData } = props;

  const wordcloud = data.map((game) => {
    return game.reviews
      .map((item) => {
        const words = item.review.split(/\s+/);
        return words.map((word) => {
          return { text: word, voted_up: item.voted_up };
        });
      })
      .flat()
      .reduce((newdata, review) => {
        const target = newdata.find((item) => item.text === review.text);
        if (target) {
          target.value = target.value + 1;
          if (review.voted_up) {
            target.positive = target.positive + 1;
          } else {
            target.negative = target.negative + 1;
          }
        } else {
          newdata.push({
            text: review.text,
            value: 1,
            positive: review.voted_up ? 1 : 0,
            negative: review.voted_up ? 0 : 1,
          });
        }
        return newdata;
      }, [])
      .filter((word) => word.text.length > 1 && /^[a-zA-Z]+$/.test(word.text))
      .map((word) => {
        return {
          text: word.text,
          value: word.value,
          rating: word.positive / (word.positive + word.negative),
        };
      });
  });

  const newData = data.map((item, index) => {
    return { ...item, wordcloud: wordcloud[index] };
  });

  setData(newData);
};

export default Wordcloud;
