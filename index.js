require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http');
const fs = require('fs');
const app = express();


const port = process.env.PORT;
if(!port)
  throw new ReferenceError("Invalid input: `PORT` is not Defined in ENV file.");

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

// Routes
try{

  const filenames = fs.readdirSync('./routes');

  if(!filenames.length)
  console.warn("!! NOTE !! : No route files found.");

  filenames.forEach(file => {
    app.use(`/api/v1/`, require(`./routes/${file}`))
  });

} catch (err){
  throw new Error(`ERROR FETCHING ROUTES FILE: ${err.message}`);
}

app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('API Error!');
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

server.on('error', (error) => {
  throw new Error(error);
});