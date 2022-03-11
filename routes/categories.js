var express = require('express');
var router = express.Router();

/* GET categories listing. */
router.get('/', function(req, res, next) {
  res.render('categories', { title: "Le Halle de Gourmets | Categories"});
});

module.exports = router;
