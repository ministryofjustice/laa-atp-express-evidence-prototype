const express = require('express')
const router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// Add your routes here - above the module.exports line
router.get('/inital-page', function (req, res) {
  res.render('initalpage')
});

// Branching

// Branching
router.get('/questiontwotest', function (req, res) {
  // Get the answer from the query string (eg. ?over18=false)
  var changedName = req.query.changedName

  if (changedName === 'yes') {
    // Redirect to the relevant page
    res.redirect('/failure')
  } else {
    // If over18 is any other value (or is missing) render the page requested
    res.render('questionthree')
  }
})

// Branching
router.get('/questionthreetest', function (req, res) {
  // Get the answer from the query string (eg. ?over18=false)
  var changedName = req.query.changedName

  if (changedName === 'no') {
    // Redirect to the relevant page
    res.redirect('/failure')
  } else {
    // If over18 is any other value (or is missing) render the page requested
    res.render('questionfour')
  }
})

// Branching
router.get('/questionfourtest', function (req, res) {
  // Get the answer from the query string (eg. ?over18=false)
  var changedName = req.query.changedName

  if (changedName === 'no') {
    // Redirect to the relevant page
    res.redirect('/failure')
  } else {
    // If over18 is any other value (or is missing) render the page requested
    res.render('questionfive')
  }
})

// Branching
router.get('/questionfivetest', function (req, res) {
  // Get the answer from the query string (eg. ?over18=false)
  var changedName = req.query.changedName

  if (changedName === 'no') {
    // Redirect to the relevant page
    res.redirect('/failure')
  } else {
    // If over18 is any other value (or is missing) render the page requested
    res.render('success')
  }
})

// Branching
router.get('/questiontwotest', function (req, res) {
  // Get the answer from the query string (eg. ?over18=false)
  var changedName = req.query.changedName

  if (changedName === 'no') {
    // Redirect to the relevant page
    res.redirect('/failure')
  } else {
    // If over18 is any other value (or is missing) render the page requested
    res.redirect('/questionthree')
  }
})

module.exports = router
