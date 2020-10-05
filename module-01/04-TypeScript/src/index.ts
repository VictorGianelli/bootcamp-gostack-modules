import express from 'express'

const app = express()

// app.listen(3333)

app.get('/', (request, response) => {

  return response.json({ mensage : 'Hello World!'});
});

app.listen(3333);