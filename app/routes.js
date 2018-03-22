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

router.get('civil/start', function (req, res) {
  res.render('/civil/start.html')
});

router.get('/generic-start', function (req, res) {
  res.render('generic-start')
});

router.get('/generic/multibank', function (req, res) {
  // Get the answer from the query string (eg. ?over18=false)
  var multiBank = req.query.multibank

  if (multiBank === 'yes') {
    // Redirect to the relevant page
    res.redirect('/generic/obbank')
  } else {
    // If over18 is any other value (or is missing) render the page requested
    res.render('generic/benefits-kind')
  }
})

router.get('/civil/multibank', function (req, res) {
  // Get the answer from the query string (eg. ?over18=false)
  var multiBank = req.query.multibank

  if (multiBank === 'yes') {
    // Redirect to the relevant page
    res.redirect('/civil/obbank')
  } else {
    // If over18 is any other value (or is missing) render the page requested
    res.render('civil/benefits-kind')
  }
})

router.get('/crime/multibank', function (req, res) {
  // Get the answer from the query string (eg. ?over18=false)
  var multiBank = req.query.multibank

  if (multiBank === 'yes') {
    // Redirect to the relevant page
    res.redirect('/crime/obbank')
  } else {
    // If over18 is any other value (or is missing) render the page requested
    res.render('crime/benefits-kind')
  }
})

router.get('/crime-remote/multibank', function (req, res) {
  // Get the answer from the query string (eg. ?over18=false)
  var multiBank = req.query.multibank

  if (multiBank === 'yes') {
    // Redirect to the relevant page
    res.redirect('/crime-remote/obbank')
  } else {
    // If over18 is any other value (or is missing) render the page requested
    res.render('crime-remote/benefits-kind')
  }
})

router.get('/crime-remote/remote', function (req, res) {
  // Get the answer from the query string (eg. ?over18=false)
  var remoteAccess = req.query.remote

  if (remoteAccess === 'yes') {
    // Redirect to the relevant page
    res.redirect('/crime-remote/remote-notification')
  } else {
    // If over18 is any other value (or is missing) render the page requested
    res.render('crime/obbank')
  }
})

router.get('/crime-remote/citizen-multi', function (req, res) {
  // Get the answer from the query string (eg. ?over18=false)
  var citmultiBank = req.query.citmultibank

  if (citmultiBank === 'yes') {
    // Redirect to the relevant page
    res.redirect('/crime-remote/citizen-obbank')
  } else {
    // If over18 is any other value (or is missing) render the page requested
    res.render('crime-remote/citizen-final')
  }
})

router.get('/crime-remote/citizen-evi', function (req, res) {
  // Get the answer from the query string (eg. ?over18=false)
  var citEvidence = req.query.citevidence

  if (citEvidence === 'yes') {
    // Redirect to the relevant page
    res.redirect('/crime-remote/citizen-identify-income')
  } else {
    // If over18 is any other value (or is missing) render the page requested
    res.render('crime-remote/citizen-final-branch')
  }
})

module.exports = router
