const { login } = require('./login');
const { register } = require('./register');
const { getUser } = require('./getUser');
const { getJobPostings } = require('./getJobPostings');
const { getCompanyTweets } = require('./getCompanyTweets');

const routes = [
  { path: '/login', handle: login },
  { path: '/register', handle: register },
  { path: '/getUser', handle: getUser },
  { path: '/getJobPostings', handle: getJobPostings },
  { path: '/getCompanyTweets', handle: getCompanyTweets } 
];

function route(req) {
  switch(req.path) {
    case '/login':
      return routes[0].handle(req.body.email, req.body.password);
    case '/register':
      return routes[1].handle(req.body);
    case '/getUser':
      return routes[2].handle(req.body.token);
    case '/getJobPostings':
      return routes[3].handle();
    case '/getCompanyTweets':
      return routes[4].handle(req.body.screenName, req.body.numberOfTweets);
    default: 
      return Promise.resolve(404);
  }
}

function findRoute(path) {
  return routes.some(e => e.path === path);
}

module.exports = { route, findRoute };