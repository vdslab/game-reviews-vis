const NodeLink = (props) => {
  const { data } = props;

  const calcWeight = (arr1, arr2) => {
    const map1 = new Map();
    const map2 = new Map();

    arr1.forEach((item) => {
      if (!map1.has(item.text) || map1.get(item.text) > item.value) {
        map1.set(item.text, item.value);
      }
    });

    arr2.forEach((item) => {
      if (!map2.has(item.text) || map2.get(item.text) > item.value) {
        map2.set(item.text, item.value);
      }
    });

    let sum = 0;

    map1.forEach((value, text) => {
      if (map2.has(text)) {
        sum += Math.min(value, map2.get(text));
      }
    });

    return sum;
  };

  return (
    <div>
      <h1>NodeLinkを表示</h1>
      {calcWeight(data[0].wordcloud, data[1].wordcloud)}
    </div>
  );
};

export default NodeLink;
