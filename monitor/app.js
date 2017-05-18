const request = require('request');
const express = require('express');
const cors = require('cors');
const app = express();

const options = {
  url: 'http://www.supremenewyork.com/mobile_stock.json',
  headers: {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13G34'
  }
};

var products = {};

app.use(cors());

function updateProducts() {
  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      let res = JSON.parse(body).products_and_categories;
      res = res.map(x => () => {
        if (x.image_url !== undefined) {
          delete x.image_url;
        }
        if (x.image_url_hi !== undefined) {
          delete x.image_url_hi;
        }
        return x;
      });
      products = res;
    }
  });
}

app.get('/products.json', function(req, res){
  res.json(products);
});

setInterval(() => {
  updateProducts();
}, 3000);

app.listen(3000);