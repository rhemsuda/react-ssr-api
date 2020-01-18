const express = require('express');
const router = require('./router.js');
const bodyParser = require('body-parser');
const app = express();

const { initializeFirestore } = require('./dal');
initializeFirestore();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('*', (req, res) => {
  if(checkAuthToken(req)) {
    if(!router.findRoute(req.path)) {
      res.status(404).send('Route not found');
      return;
    }
    router.route(req).then(response => {
      console.log('response', response);
      res.status(200).send(response);
    }).catch(err => {
      res.status(200).send(err);
    });
  } else {
    res.status(401).send('Unauthorized');
  }
});

app.listen(3001, () => {
  console.log('Listening on port 3001');
})

function checkAuthToken(req) {
  return true;
}