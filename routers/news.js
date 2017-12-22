const express = require("express");
const router = express.Router();
const helpers = require("./../helpers");
const fetch = require("node-fetch");
const open_sources = require("./../open_sources");
const stringSimilarity = require("string-similarity");

// ----------------------------------------
// FETCH DATA FROM NEWS API
// ----------------------------------------

let open_sources_links = Object.keys(open_sources);

// ----------------------------------------
// FETCH DATA FROM NEWS API
// ----------------------------------------
var url =
  "https://newsapi.org/v2/everything?" +
  "q=hillary&" +
  "from=2017-12-22&" +
  `apiKey=${process.env.NEWS_API_KEY}`;

async function parseNewsData(url) {
  let res = await fetch(url); //node fetch returns a promise
  let json = await res.json();
  let parsedArr = json.articles.map(article => {
    return {
      title: article.title,
      source: article.source.id,
      url: article.url,
      body: article.description
    };
  });
  let joinedArr = parsedArr.forEach(article => {
    return (matchedLink = stringSimilarity.findBestMatch(
      article.source,
      open_sources_links
    ).bestMatch.target);
  });

  console.log(joinedArr);
}

parseNewsData(url);

router.get("/", async (req, res, next) => {
  console.log(newsData);
  // const count = +req.query.count || 10;
  // const titles = [];
  // for (let i = 0; i < count; i++) {
  //   titles.push(furiousSpinoff());
  // }
  // res.status(200).json(titles);
});

module.exports = router;
