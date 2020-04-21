const express = require('express');
const { uuid, isUuid } = require('uuidv4');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const techs = [];

function logRequests(req, res, next) {
  const { method, url } = req;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);

  return next();
}

function validateProjectId(req, res, next) {
  const { id } = req.params;

  if (!isUuid(id)) {
    return res.status(400).json({message : 'id not valid.'})
  }

  return next();
}

app.use(logRequests);

app.use('/tech/:id', validateProjectId);

app.get('/tech', (req, res) => {
  const { search } = req.query;

  const resultado = search ? techs.filter(fil=> fil.description.includes(search)) : techs;
  
  return res.json(resultado);
});

app.post('/tech', (req, res) => {
  const { name, description } = req.body;

  const tech = { id: uuid(), name, description };

  techs.push(tech);

  return res.json(tech);
});

app.put('/tech/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const techIndex = techs.findIndex( f => f.id == id);

  if (techIndex < 0) {
    return res.status(404).json({ message : 'Id not found'});
  }

  const tech = {
    id,
    name,
    description
  }

  techs[techIndex] = tech;

  return res.json(tech);
});

app.delete('/tech/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const techIndex = techs.findIndex( f => f.id == id);

  if (techIndex < 0) {
    return res.status(404).json({ message : 'Id not found'});
  }

  techs.splice(techIndex, 1);

  return res.status(200).json({ message : 'successful deleted'});
});


app.listen(3333, () => console.log('back-end started'));