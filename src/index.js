const express = require('express');
const app = express();
app.use(express.json());

const techs = [];

app.get('/tech', (req, res) => {
  return res.json(techs);
});

app.post('/tech', (req, res) => {
  return res.json();
});

app.put('/tech/:id', (req, res) => {
  return res.json();
});

app.delete('/tech/:id', (req, res) => {
  return res.json();
});


app.listen(3333, () => console.log('back-end started'));