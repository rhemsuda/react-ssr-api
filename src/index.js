const express = require('express');
const router = require('./router.js');
const app = express();

const { initializeFirestore } = require('./dal');
initializeFirestore();

app.get('*', (req, res) => {
  if(checkAuthToken(req.cookies)) {
    if(!router.findRoute(req.path)) {
      res.status(404).send('Route not found');
      return;
    }
    router.route(req).then(response => {
      res.status(200).send(response);
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