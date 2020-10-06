import express from 'express';
import routes from './routes';

const app = express();

app.get('/', (request, response) => {
  return response.json({ mensage: 'Hello World!' });
});

app.listen(3333, () => {
  console.log('🚀 Back-end started');
});
