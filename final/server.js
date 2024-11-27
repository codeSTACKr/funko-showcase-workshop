const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.Port || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/yourDB', { useNewUrlParser: true, useUnifiedTopology: true });

const funkoSchema = new mongoose.Schema({
  imageUrl: String,
  show: String,
  character: String,
  yearReleased: Number,
  number: Number,
});

const Funko = mongoose.model('Funko', funkoSchema);

app.post('/api/funkos', async (req, res) => {
  const newFunko = new Funko(req.body);
  try {
    await newFunko.save()
    res.status(201).send(newFunko);
  } catch (error) {
    res.status(400).send(error);
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
