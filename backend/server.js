const express = require('express');
var cors = require('cors')

const sampleFishes = require('../src/sample-fishes')
let fishes = {};

const app = express();
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.json(fishes);
})

app.get('/sample-fish', (req, res) => {
  fishes = {...sampleFishes};
  res.json(fishes);
})

app.get('/reset', (req, res) => {
  fishes = {};
  res.json(fishes);
})

app.post('/', (req, res) => {
  const newFish = req.body;
  fishes[newFish.name] = newFish;
  res.status(201).json(newFish);
})

app.put('/:fishId', (req, res) => {
  const fishId = req.params.fishId;
  const updatedFish = req.body;
  fishes[fishId] = updatedFish;
  res.sendStatus(204);
})

app.delete('/:fishId', (req, res) => {
  const fishId = req.params.fishId;
  delete fishes[fishId];
  res.sendStatus(204);
})

app.listen(3001, function () {
  console.log('listening on 3001')
})