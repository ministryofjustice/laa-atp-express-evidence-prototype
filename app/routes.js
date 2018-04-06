require('dotenv').config();
const express = require('express')
const request = require('request')
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
  res.render('civil/start.html')
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
    res.render('generic/other-income')
  }
})

router.get('/generic-truelayer/multibank', function (req, res) {
  // Get the answer from the query string (eg. ?over18=false)
  var multiBank = req.query.multibank

  if (multiBank === 'yes') {
    // Redirect to the relevant page
    res.redirect('/generic-truelayer/obbank')
  } else {
    // If over18 is any other value (or is missing) render the page requested
    res.render('generic-truelayer/other-income')
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



router.get('/generic-truelayer/bank-success', function (req, res, next) {

  var domain = req.hostname;

  if (domain=='localhost'){
    var redirect_uri = 'http://' + domain + ':3000/generic-truelayer/bank-success'
  }
  else{
    var redirect_uri = 'https://laa-atp-express-evidence-proto.herokuapp.com/generic-truelayer/bank-success'
  }

  console.log('>>>>>>>>>>>'+redirect_uri);

  var authRequestUrl = 'https://auth.truelayer.com/connect/token';
  var grant_type = "authorization_code";
  var client_id = process.env.CLIENT_ID;
  var client_secret = process.env.CLIENT_SECRET;
  var code = req.query.code;

  var authJsonOut = {grant_type: grant_type,
              client_id: client_id,
              client_secret: client_secret,
              redirect_uri: redirect_uri,
              code: code
            }

  console.log(authJsonOut);

  request.post({
      url: authRequestUrl,
      headers: {'content-type':'application/json'},
      form: authJsonOut
    }, function (error, response, body) {

          if (!error && response.statusCode == 200) {

              authJsonIn = JSON.parse(body);
              console.log(authJsonIn);

              var token = authJsonIn.access_token;
              var accountId = '8c0f6b05fa00f3f7142660c377237be1';
              var getAccountsUrl = 'https://api.truelayer.com/data/v1/accounts';
              var getBalanceUrl = getAccountsUrl + '/' + accountId + '/balance';
              var getTransactionsUrl = getAccountsUrl + '/' + accountId + '/transactions';

              var bearerToken = "Bearer " + token;

              request.get({
                  url: getAccountsUrl,
                  headers: {Authorization: bearerToken}
                }, function (error, response, body) {
                      if (!error && response.statusCode == 200) {
                          accountsJsonIn = JSON.parse(body);
                          console.log(accountsJsonIn);

                          request.get({
                              url: getBalanceUrl,
                              headers: {Authorization: bearerToken}
                          }, function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    balanceJsonIn = JSON.parse(body);
                                    console.log(balanceJsonIn);

                                    request.get({
                                      url: getTransactionsUrl,
                                      headers: {Authorization: bearerToken}
                                    }, function (error, response, body) {
                                          if (!error && response.statusCode == 200) {
                                              transactionsJsonIn = JSON.parse(body);
                                              console.log(transactionsJsonIn);

                                              res.render('generic-truelayer/bank-success', {accounts: accountsJsonIn, balance: balanceJsonIn, transactions: transactionsJsonIn, });

                                          } else {
                                              console.log("There was an error: ") + response.statusCode;
                                              console.log(body);
                                          }
                                    });

                                } else {
                                    console.log("There was an error: ") + response.statusCode;
                                    console.log(body);
                                }
                          });

                      } else {
                          console.log("There was an error: ") + response.statusCode;
                          console.log(body);
                      }
                  });

          } else {
              console.log("There was an error: ") + response.statusCode;
              console.log(body);
          }
      });

})

module.exports = router
