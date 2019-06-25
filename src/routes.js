import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Leandro Pinto',
    email: 'leandro.pnto@gmail.com',
    password_hash: '1234123412341234',
  });

  res.json({ message: 'Bem vindo ao site!', user });
});

export default routes;
