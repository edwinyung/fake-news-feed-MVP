const express = require("express");
const router = express.Router();
const helpers = require("./../helpers");
var mongoose = require("mongoose");
var models = require("./../models");
var Post = mongoose.model("Post");

const env = process.env.NODE_ENV || "development";
const config = require("./../config/mongoose")[env];
const mongooseeder = require("mongooseeder");

Object.keys(models).forEach(modelName => {
  global[modelName] = mongoose.model(modelName);
});

// ----------------------------------------
// REQUIRE THESE PACKAGES FOR DATA API
// ----------------------------------------
const fetch = require("node-fetch");
const open_sources = require("./../open_sources");
const stringSimilarity = require("string-similarity");

// ----------------------------------------
// FETCH DATA FROM OPEN SOURCES
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

let results = async function parseNewsData(urlLink) {
  try {
    let res = await fetch(urlLink); //node fetch returns a promise
    let json = await res.json();
    //extract useful info from API
    let parsedArr = await json.articles.map(article => {
      return {
        title: article.title,
        source: article.source.name,
        article_url: article.url,
        body: article.description
      };
    });
    //join the two datasets together, both open_sources AND NewsAPI
    let joinedArr = await parsedArr.map(article => {
      let matchedLinkObj = stringSimilarity.findBestMatch(
        article.article_url.substring(0, 35), //account for https://www characters and don't count all the fluff at end of URL
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
    return joinedArr;
  } catch (e) {
    console.log(e);
  }
};

const mongodbUrl =
  process.env.NODE_ENV === "production"
    ? process.env[config.use_env_variable]
    : `mongodb://${config.host}/${config.database}`;

mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  models: models,
  clean: true,
  mongoose: mongoose,
  seeds: async function seeds() {
    let resultsArray = await results(url);
    let posts = [];
    for (let i = 0; i < resultsArray.length; i++) {
      let post = new Post({
        title: resultsArray[i].title, //news_api
        body: resultsArray[i].body, //news_api
        article_url: resultsArray[i].article_url, //news_api
        source: resultsArray[i].source, //news_api
        type: resultsArray[i].type, //open_sources
        type2: resultsArray[i].type2, //open_sources
        type3: resultsArray[i].type3, //open_sources
        Notes: resultsArray[i].Notes //open_sources
      });
      posts.push(post);
    }
    var promises = [];
    posts.forEach(model => {
      promises.push(model.save());
    });
    return Promise.all(promises);
  }
});

module.exports = router;
