# nov-hackaton-studious-chainsaw

HACKATON NOV 2017

![alt text](screenshots/index.png "Index Screenshot")
![alt text](screenshots/post.png "Individual Article Screenshot")

Welcome to my Fake News Aggregator app that lets you check the validity of breaking news.

This app is basically Google News with fake news tags. Each breaking news article has tags determining its validity. Also, users are able to comment/vote on the validity of each breaking news.

I pull the breaking news data from https://newsapi.org/, and I cross reference the urls of each of the news articles with a dataset maintained by Open Sources (http://www.opensources.co/). This dataset has fake news tags for over a thousand websites.

###Getting Started

1. Fork and clone this repo
2. cd into the project directory
3. Go to https://newsapi.org/ and get API key, put this in a .env file in a main directory like so: NEWS_API_KEY={YOUR API KEY HERE}
4. RUN npm i
5. RUN node app.js
6. DO NOT USE NODEMON for this app.
7. THEN go into localhost
8. Sign up and login. Password must be more than 8 characters
9. Click on a link's "More Information" or "Body" to get more information about the link. Click on the link "Title" to go to the link's website.

###Things left to do:

1. Comments should show content in addition to the username
2. Users should be able to vote for each news article to determine how geniune/fake it is
3. Stop database from seeding every time the app is accessed

###Sources:
Viking Code School for boilerplate, generated code
https://newsapi.org/
Open Sources (http://www.opensources.co/)
