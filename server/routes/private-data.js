var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  console.log(req.decodedToken); // Here you can see the information firebase gives you about the user
  res.send("Secret DATA!!! You got it!!! Great work " + req.decodedToken.name + "!!!");
}); // end GET '/'

module.exports = router;
