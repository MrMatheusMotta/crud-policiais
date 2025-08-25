
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const policiaisRoutes = require('./routes/policiais');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use('/policiais', policiaisRoutes);


app.get('/', (req, res) => {
  res.send('API para cadastro de policiais está no ar!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});