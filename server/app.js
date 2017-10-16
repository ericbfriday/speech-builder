var express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const decoder = require('./modules/decoder');
const privateData = require('./routes/private-data');
const wordLookup = require('./routes/wordLookup');
const port = process.env.PORT || 8080;
const pool = require('./modules/pool');

app.get('/', function(req, res){
  res.sendFile(path.resolve('./public/index.html'));
});

app.use(express.static('public'));
app.use(bodyParser.json());

// Runs word lookup function
app.use('/wordLookup', wordLookup);

// Decodes the token in the request header and attaches the decoded token to the request.
app.use(decoder.token);

/* Whatever you do below this is protected by your authentication.
WARNING: So far you are returning secret data to ANYONE who is logged in.
There is still more work to be done if you want to implement roles.
No authorization has been completed yet in this branch.
You can use req.decodedToken and some logic to do that.
Other branches in the nodeFire repository show how to do that. */

// This is the route for your secretData. The request gets here after it has been authenticated.
app.use("/privateData", privateData);

app.listen(port, function(){
  console.log("Listening on port: ", port);
});
