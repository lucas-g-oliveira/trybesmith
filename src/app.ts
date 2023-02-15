import express from 'express';
import route from './controller/routes';

const app = express();
app.use(route);

app.use(express.json());

export default app;
