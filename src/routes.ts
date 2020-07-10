import express from 'express';
import Players  from './controllers/Players';

const players = new Players;

const routes = express.Router();
routes.get('/', players.index)

export default routes;
