const express = require('express');
const bodyParser = require('body-parser');
const yelp = require('yelp-fusion');
const slowDown = require("express-slow-down");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const searchRequest = {
  term: 'Ice Cream Parlor',
  location: 'Redwood City, CA',
  limit: 10,
  sort_by: 'rating'
};
const apiKey = 'pSxxXBpunBnBT0mIoP_m6VTEy32nmGTOG8xO5_9ehd8uIPpSgZvaSTxqmVoNdR_OxuXI2u5JLB5gltsjBUxat5sy4ci96wvRmWJT_Bmw473B48rMEeZQml2lcPBeX3Yx';
const client = yelp.client(apiKey);

app.get('/api/shops', async (req, res) => {
  try {
    const shopsResp = await client.search(searchRequest);
    let shops = shopsResp.jsonBody.businesses

    shops = shops.map(shop => {
      let { id, name, location, rating, image_url, url } = shop;
      return { id, name, location, rating, image_url, url };
    });
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(shops));
  } catch (error) {
    console.log('Error occurred while fetching resutls:- ', error);
    res.send(500, error);
  }
});



//using rate limiter for getting review since, yelp is not allowing more request at once.
//Delaying each request by 1 sec after 1st 5
const resetPasswordSpeedLimiter = slowDown({
  windowMs: 1000,
  delayAfter: 5,
  delayMs: 1000
});

app.get('/api/review/:id', resetPasswordSpeedLimiter, async (req, res) => {
  try {
    let reviewsResp = await client.reviews(req.params.id);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(reviewsResp.jsonBody.reviews[0]));
    // res.send(reviewsResp.body);
  } catch (error) {
    console.log('Error occurred while fetching resutls:- ', error);
    res.send(500, error);
  }
})

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
