const express = require('express')
const router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// Add your routes here - above the module.exports line
router.get('/crime-start', function (req, res) {
  res.render('crime-start')
});

router.get('/civil-start', function (req, res) {
  res.render('civil-start')
});

router.get('/generic-start', function (req, res) {
  res.render('generic-start')
});

module.exports = router
