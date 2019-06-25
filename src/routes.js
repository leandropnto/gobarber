const { Router } = require('express');

const routes = new Router();
routes.get('/', (req, res) => {
  return res.json({ message: 'Bem vindo ao site' });
})

module.exports = routes;