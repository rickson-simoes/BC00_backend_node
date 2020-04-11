const express = require('express');

const app = express();

app.use(express.json());

app.get('/tech', (req, res) => {
  return res.json([
    'react', 'react native'
  ]);
});

app.post('/tech', (req, res) => {
  const params = req.body;

  console.log(params);  

  return res.json([
    'react', 'react native', 'node'
  ]);
});

app.put('/tech/:id', (req, res) => {
  return res.json([
    'reactee', 'react native', 'node'
  ]);
});

app.delete('/tech/:id', (req, res) => {
  return res.json([
    'react', 'react native'
  ]);
});


app.listen(3333, () => console.log('back-end started'));