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
  try {
    let res = await fetch(url); //node fetch returns a promise
    let json = await res.json();
    //extract useful info from API
    let parsedArr = await json.articles.map(article => {
      return {
        title: article.title,
        url: article.url,
        body: article.description
      };
    });
    //join the two datasets together, both open_sources AND NewsAPI
    let joinedArr = await parsedArr.map(article => {
      let matchedLinkObj = stringSimilarity.findBestMatch(
        article.url.substring(0,40), //account for https://www characters and don't count all the fluff at end of URL
        open_sources_links
      );
      let matchedLink = matchedLinkObj.bestMatch.target;
      return {
        ...article,
        type: open_sources[matchedLink]["type"],
        type2: open_sources[matchedLink]["2nd type"],
        type3: open_sources[matchedLink]["3rd type"],
        Notes: open_sources[matchedLink]["Source Notes (things to know?)"]
      };
    });
    console.log(joinedArr);
  } catch (e) {
    console.log(e);
  }
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
