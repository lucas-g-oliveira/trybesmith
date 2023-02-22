import express from 'express';
import route from './controller/routes';

const app = express();

app
  .use(express.json())
  .use(route);

export default app;
