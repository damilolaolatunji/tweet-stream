require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const cors = require('cors');
const Pusher = require('pusher');
const bodyParser = require('body-parser');

// Create an express app
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  encrypted: true,
});

app.post('/', (req, res) => {
  console.log(req.body);
  pusher.trigger('tweets', 'new-tweet', {
    payload: req.body,
  });
});

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
