const express = require('express');
const bodyParser = require('body-parser');
const yelp = require('yelp-fusion');

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
    res.setHeader('Content-Type', 'application/json');
    res.send(shopsResp.body);
  } catch (error) {
    console.log('Error occurred while fetching resutls:- ', error);
    res.send(500, error);
  }
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
