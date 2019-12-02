const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');

const app = express();

// Bodyparser middleWare
app.use(bodyParser.json());

// DB config 
const db = require('./config/keys').mongoURI;

// Connect to mongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use routes
// anything which goes through /api/items should refer to items
app.use('/api/items', items);

// running a server
// we are deploying it to heroku so port heroku server k according fetch krenge
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));