require('dotenv').config();
const express = require('express')
const request = require('request')
const router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

/******************************  Crime  ******************************/

router.get('/crime/multibank', function (req, res) {

  var multiBank = req.query.multibank

  if (multiBank === 'yes') {
    res.redirect('/crime/obbank')
  } else {
    res.render('crime/benefits-kind')
  }
})

/******************************  Civil  ******************************/

router.get('/civil/multibank', function (req, res) {

  var multiBank = req.query.multibank

  if (multiBank === 'yes') {
    res.redirect('/civil/obbank')
  } else {
    res.render('civil/benefits-kind')
  }
})

/*****************************  Generic  *****************************/

router.get('/generic/multibank', function (req, res) {

  var multiBank = req.query.multibank

  if (multiBank === 'yes') {
    res.redirect('/generic/obbank')
  } else {
    res.render('generic/other-income')
  }
})

/***************************  Crime Remote  **************************/

router.get('/crime-remote/multibank', function (req, res) {

  var multiBank = req.query.multibank

  if (multiBank === 'yes') {
    res.redirect('/crime-remote/obbank')
  } else {
    res.render('crime-remote/benefits-kind')
  }
})

router.get('/crime-remote/remote', function (req, res) {

  var remoteAccess = req.query.remote

  if (remoteAccess === 'yes') {
    res.redirect('/crime-remote/remote-notification')
  } else {
    res.render('crime/obbank')
  }
})

router.get('/crime-remote/citizen-multi', function (req, res) {

  var citmultiBank = req.query.citmultibank

  if (citmultiBank === 'yes') {
    res.redirect('/crime-remote/citizen-obbank')
  } else {
    res.render('crime-remote/citizen-final')
  }
})

router.get('/crime-remote/citizen-evi', function (req, res) {

  var citEvidence = req.query.citevidence

  if (citEvidence === 'yes') {
    res.redirect('/crime-remote/citizen-identify-income')
  } else {
    res.render('crime-remote/citizen-final-branch')
  }
})

/************************  Generic TrueLayer  ************************/

router.get('/generic-truelayer/multibank', function (req, res) {

  var multiBank = req.query.multibank

  if (multiBank === 'yes') {
    res.redirect('/generic-truelayer/obbank')
  } else {
    res.render('generic-truelayer/other-income')
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

                                              res.render('generic-truelayer/bank-success', {accounts: accountsJsonIn, balance: balanceJsonIn, transactions: transactionsJsonIn});

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

/************************  Citizen Truelayer  ************************/

router.get('/citizen-truelayer/dwp-consent', function (req, res) {

  var checkboxes = req.query.consent

  var dwp = checkboxes[0]
  var ob = checkboxes[1]

  if (checkboxes === '_unchecked'){
    res.redirect('/citizen-truelayer/property')
  }
  else{

    if (dwp === 'dwp') {
      res.redirect('/citizen-truelayer/dwpdetails')
    } else {
      res.render('citizen-truelayer/obbank')
    }
  }
})


router.get('/citizen-truelayer/ob-consent', function (req, res) {

  var checkboxes =  req.session.data['consent']

  var dwp = checkboxes[0]
  var ob = checkboxes[1]

  if (ob  === 'ob') {
      res.redirect('/citizen-truelayer/obbank')
    } else {
      res.render('citizen-truelayer/property')
  }
})


router.get('/citizen-truelayer/multibank', function (req, res) {

  var multiBank = req.query.multibank

  if (multiBank === 'yes') {
    res.redirect('/citizen-truelayer/obbank')
  } else {
    res.render('citizen-truelayer/identify-income')
  }
})

router.get('/citizen-truelayer/cash', function (req, res) {

  var cash = req.query.cash

  if (cash === 'yes') {
    res.redirect('/citizen-truelayer/cash-amount')
  } else {
    res.render('citizen-truelayer/benefits-kind')
  }
})

router.get('/citizen-truelayer/benefitsinkind', function (req, res) {

  var benefitsinkind = req.query.benefitsinkind

  if (benefitsinkind === 'yes') {
    res.redirect('/citizen-truelayer/benefits-kind-amount')
  } else {
    res.render('citizen-truelayer/identify-outgoings')
  }
})

router.get('/citizen-truelayer/ownsproperty', function (req, res) {

  var ownsproperty = req.query.ownsproperty

  if (ownsproperty === 'yes') {
    res.redirect('/citizen-truelayer/property-amount')
  } else {
    res.render('citizen-truelayer/capital-assets')
  }
})


router.get('/citizen-truelayer/ownsproperty', function (req, res) {

  var ownsproperty = req.query.ownsproperty

  if (ownsproperty === 'yes') {
    res.redirect('/citizen-truelayer/property-amount')
  } else {
    res.render('citizen-truelayer/capital-assets')
  }
})

router.get('/citizen-truelayer/has-other-capital', function (req, res) {

  var hasOtherCapital = req.query.hasOtherCapital

  if (hasOtherCapital === 'yes') {
    res.redirect('/citizen-truelayer/national-savings')
  } else {
    res.render('citizen-truelayer/means-result')
  }
})

router.get('/citizen-truelayer/has-national-savings', function (req, res) {

  var hasNationalSavings = req.query.hasNationalSavings

  if (hasNationalSavings === 'yes') {
    res.redirect('/citizen-truelayer/national-savings-amount')
  } else {
    res.render('citizen-truelayer/premium-bonds')
  }
})

router.get('/citizen-truelayer/has-premium-bonds', function (req, res) {

  var hasPremiumBonds = req.query.hasPremiumBonds

  if (hasPremiumBonds === 'yes') {
    res.redirect('/citizen-truelayer/premium-bonds-amount')
  } else {
    res.render('citizen-truelayer/capital-bonds')
  }
})

router.get('/citizen-truelayer/has-capital-bonds', function (req, res) {

  var hasCapitalBonds = req.query.hasCapitalBonds

  if (hasCapitalBonds === 'yes') {
    res.redirect('/citizen-truelayer/capital-bonds-amount')
  } else {
    res.render('citizen-truelayer/stocks-shares')
  }
})

router.get('/citizen-truelayer/has-stocks-shares', function (req, res) {

  var hasStocksShares = req.query.hasStocksShares

  if (hasStocksShares === 'yes') {
    res.redirect('/citizen-truelayer/stocks-shares-amount')
  } else {
    res.render('citizen-truelayer/other-savings')
  }
})

router.get('/citizen-truelayer/has-other-savings', function (req, res) {

  var hasOtherSavings = req.query.hasOtherSavings

  if (hasOtherSavings === 'yes') {
    res.redirect('/citizen-truelayer/other-savings-amount')
  } else {
    res.render('citizen-truelayer/means-result')
  }
})

router.get('/citizen-truelayer/assets', function (req, res) {

  var checkboxes = req.query.assets

  if (checkboxes === '_unchecked'){
    res.redirect('/citizen-truelayer/means-result')
  }
  else{
    res.render('citizen-truelayer/capitalshares', {assets:checkboxes})
  }
})


router.get('/citizen-truelayer/bank-success', function (req, res, next) {

  var domain = req.hostname;

  if (domain=='localhost'){
    var redirect_uri = 'http://' + domain + ':3000/citizen-truelayer/bank-success'
  }
  else{
    var redirect_uri = 'https://laa-atp-express-evidence-proto.herokuapp.com/citizen-truelayer/bank-success'
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

                                              res.render('citizen-truelayer/bank-success', {accounts: accountsJsonIn, balance: balanceJsonIn, transactions: transactionsJsonIn});

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

/****************************  Solicitor  ****************************/


router.get('/solicitor/newOrResume', function (req, res) {

  var newOrResume = req.query.newOrResume

  if (newOrResume === 'new') {
    res.redirect('basic-details')
  } else {
    res.redirect('case-dashboard')
  }
})



/*********************************************************************/

module.exports = router
