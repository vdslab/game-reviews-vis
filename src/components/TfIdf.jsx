import React, { useEffect, useRef } from "react";

export const TfIdf = (props) => {
  const data = props;

  //console.log(data);
  //レビューだけを抽出

  const documents = data.map((data) =>
    data.reviews.map((reviews) => reviews.review)
  );
  //console.log(documents);

  // 各ゲームごとにレビューをまとめる
  const combinedReviews = documents.map((gameReviews) => gameReviews.join(" "));
  //console.log(combinedReviews);

  const stopWords = [
    "a",
    "but",
    "during",
    "hows",
    "it's",
    "said",
    "this",
    "we're",
    "who've",
    "about",
    "by",
    "each",
    "however",
    "it's",
    "says",
    "those",
    "we've",
    "whove",
    "above",
    "can",
    "either",
    "i",
    "its",
    "see",
    "through",
    "we've",
    "will",
    "across",
    "can't",
    "for",
    "i'd",
    "let's",
    "she",
    "to",
    "weve",
    "with",
    "after",
    "can't",
    "from",
    "i'd",
    "let's",
    "she'd",
    "too",
    "were",
    "within",
    "all",
    "cant",
    "given",
    "i'll",
    "lets",
    "she'd",
    "towards",
    "what",
    "without",
    "along",
    "cannot",
    "had",
    "i'll",
    "may",
    "shed",
    "under",
    "what's",
    "won't",
    "also",
    "could",
    "has",
    "i'm",
    "me",
    "she'll",
    "until",
    "what's",
    "won't",
    "am",
    "couldn't",
    "have",
    "i'm",
    "more",
    "she'll",
    "us",
    "whats",
    "would",
    "an",
    "couldn't",
    "having",
    "im",
    "most",
    "shell",
    "use",
    "when",
    "wouldn't",
    "and",
    "did",
    "he",
    "i've",
    "much",
    "should",
    "used",
    "when's",
    "wouldn't",
    "any",
    "didn't",
    "he'd",
    "i've",
    "must",
    "since",
    "uses",
    "when's",
    "you",
    "are",
    "aren't",
    "didnt",
    "he'd",
    "ive",
    "my",
    "so",
    "using",
    "whens",
    "you'd",
    "aren't",
    "didnt",
    "hed",
    "if",
    "no",
    "some",
    "very",
    "where",
    "you'd",
    "aren't",
    "didnt",
    "he'll",
    "in",
    "not",
    "such",
    "want",
    "whether",
    "youd",
    "arent",
    "do",
    "he'll",
    "instead",
    "now",
    "than",
    "was",
    "which",
    "you'll",
    "as",
    "does",
    "her",
    "into",
    "of",
    "that",
    "wasn't",
    "while",
    "you'll",
    "at",
    "be",
    "because",
    "been",
    "before",
    "being",
    "between",
    "both",
    "and",
    "the",
    "of",
    "your",
    "to",
    "you",
    "I",
  ];

  // 各ゲームごとに reviews の中の要素を単語ごとに分割して配列にする
  // 被っているやつを除く
  const uniqueWordsArray = documents.map((item) => {
    const uniqueWords = new Set();
    item.forEach((review) => {
      review.split(/\s+/).forEach((word) => {
        uniqueWords.add(word);
      });
    });

    return Array.from(uniqueWords);
  });

  const unique = uniqueWordsArray.map((array) =>
    array.filter((i) => {
      return !stopWords.find((item) => i === item);
    })
  );

  //除かない
  const wordsArray = documents.map((item) => {
    const allWords = [];
    item.forEach((review) => {
      review.split(/\s+/).forEach((word) => {
        allWords.push(word);
      });
    });
    return allWords;
  });

  //console.log(wordsArray);

  ///////////////////////////////////////////////
  const TFIDFofGame = [];

  for (let i = 0; i < data.length; i++) {
    function calculateIDF(documents, terms) {
      const idfResults = {};

      terms.forEach((term) => {
        const documentCountWithTerm = documents.reduce(
          (count, document) => (document.includes(term) ? count + 1 : count),
          0
        );
        const idf = Math.log(documents.length / documentCountWithTerm);
        idfResults[term] = idf + 1;
      });

      return idfResults;
    }

    const terms = unique[i]; // 例としてuniqueWordsArrayの最初の文書の単語を使用

    const idfResults = calculateIDF(documents[i], terms);
    //console.log("IDF Results:", idfResults);

    // TFを計算する関数
    function calculateTF(document) {
      const wordCount = {}; // 単語の出現回数を保持するオブジェクト

      // 文書内の各単語の出現回数を数える
      document.forEach((word) => {
        wordCount[word] = (wordCount[word] || 0) + 1;
      });

      // 各単語の出現回数を文書内の単語数で割ってTFを計算
      const tf = {};
      const totalWords = document.length;
      Object.keys(wordCount).forEach((word) => {
        tf[word] = wordCount[word] / totalWords;
      });

      return tf;
    }

    // TFを計算
    const tfResult = calculateTF(wordsArray[i]);
    //console.log(tfResult);

    // オブジェクト同士のプロパティの値を掛け算
    const resultObject = multiplyObjects(tfResult, idfResults);
    //console.log(tfResult.The * idfResults.The);

    //////////////////////////////////////

    //console.log(resultObject);
    const TFIDF = [];
    for (const key in resultObject) {
      TFIDF.push({ text: key, value: resultObject[key], rating: 1 });
    }
    //console.log(TFIDF);

    TFIDFofGame.push(TFIDF);
  }

  //TF-IDF計算
  function multiplyObjects(obj1, obj2) {
    const result = {};

    // obj1とobj2のプロパティをイテレート
    for (const key in obj1) {
      const number = 3;
      if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
        result[key] = parseFloat(
          (obj1[key] * obj2[key] * 10 ** number).toFixed(number)
        );
      }
    }

    return result;
  }

  return TFIDFofGame;
};
