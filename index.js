require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http');
const fs = require('fs');
const app = express();
const cors = require('cors');

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the URL you want to allow
  methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Allowed headers
};

// Use the CORS middleware with the options
app.use(cors(corsOptions));


const port = process.env.PORT;
if(!port)
  throw new ReferenceError("Invalid input: `PORT` is not Defined in ENV file.");

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

/* ================ REDIS SESSION =================*/
try{

const RedisStore = require("connect-redis").default;
const session = require("express-session");
const {createClient} = require("redis");


let redisClient = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  databases: 1,
})
redisClient.connect().catch(console.error)

let redisStore = new RedisStore({
  client: redisClient,
  prefix: `${process.env.APP_NAME}:`,
})

app.use(
  session({
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    secret: process.env.APP_SECRET,
  }),
)

} catch (err){
  throw new Error(`ERROR IN REDIS SESSION : ${err.message}`);
}
/* ================ REDIS SESSION =================*/

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


/* ========== TEST CODE FOR REDIS SESSION =========== */

app.get('/', (req, res) => {
  console.log("📢[:60]: req.session: ", req.session);
  let test = {
    key: "12345"
  }
  res.cookie('session_id', 'abcdef123456');
  if (req.session.views) {
    
    req.session.views++;
    req.session.testStore = test;
    res.send(`Number of views: ${req.session.views}`);
  } else {
    req.session.views = 1;
    res.send('Welcome to the session demo. Refresh!');
  }

  console.log("📢[:60]: req.session: ", req.session);

});
app.get('/clearsession', (req, res) => {
  console.log("📢[:86]: req.cookies.session_id: ", req.cookies.session_id);
  req.session.destroy();
  res.send('Session Destroyed Successfuly!');
});

/* ========== TEST CODE FOR REDIS SESSION ===========*/

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