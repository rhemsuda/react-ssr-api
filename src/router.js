const { login } = require('./login');

const routes = [
  { path: '/login', handle: login }
];

function route(req) {
  switch(req.path) {
    case '/login':
      return routes[0].handle('kyle13524', 'monkeys123');
    default: 
      return Promise.resolve(404);
  }
}

function findRoute(path) {
  return routes.some(e => e.path === path);
}

module.exports = { route, findRoute };