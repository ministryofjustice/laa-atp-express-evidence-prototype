require('dotenv').config();
const express = require('express')
const request = require('request')
const router = express.Router()

var usersJSON = '';
var accountsJSON = '';
var transactionsJSON = '';

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

/*router.get('/generic-truelayer/bank-success', function (req, res, next) {

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
              var accountId;
              var getAccountsUrl = 'https://api.truelayer.com/data/v1/accounts';
              var getBalanceUrl;
              var getTransactionsUrl;

              var bearerToken = "Bearer " + token;

              request.get({
                  url: getAccountsUrl,
                  headers: {Authorization: bearerToken}
                }, function (error, response, body) {
                      if (!error && response.statusCode == 200) {
                          accountsJsonIn = JSON.parse(body);
                          console.log(accountsJsonIn);

                          accountId = accountsJsonIn['results'][0].account_id;

                          getBalanceUrl= getAccountsUrl + '/' + accountId + '/balance';

                          request.get({
                              url: getBalanceUrl,
                              headers: {Authorization: bearerToken}
                          }, function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    balanceJsonIn = JSON.parse(body);
                                    console.log(balanceJsonIn);

                                    getTransactionsUrl = getAccountsUrl + '/' + accountId + '/transactions';

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

})*/

/************************  Citizen Truelayer  ************************/
/*
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
*/
/*
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
*/

router.get('/citizen-truelayer/pre-start-check', function (req, res) {
  res.redirect('/citizen-truelayer/start')
})

router.get('/citizen-truelayer/multibank', function (req, res) {

  var multiBank = req.query.multibank

  var route = req.session.data['route']

  if (route == 'route2')
    res.render('citizen-truelayer/identify-income')

  else
    res.redirect('https://hzgzo6.axshare.com/#c=2');
  // if (multiBank === 'yes') {
  //   res.redirect('/citizen-truelayer/obmultiple-yes')
  // } else {
  //   res.render('citizen-truelayer/identify-income')
  // }
})

router.get('/citizen-truelayer/suitable-for-ob', function (req, res) {

  var suitable = req.query.suitable

  if (suitable === 'yes') {
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
    res.render('citizen-truelayer/capital-assets-other')
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


/*router.get('/citizen-truelayer/bank-success', function (req, res, next) {

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
              var accountId;
              var getAccountsUrl = 'https://api.truelayer.com/data/v1/accounts';
              var getBalanceUrl;
              var getTransactionsUrl;

              var bearerToken = "Bearer " + token;

              request.get({
                  url: getAccountsUrl,
                  headers: {Authorization: bearerToken}
                }, function (error, response, body) {
                      if (!error && response.statusCode == 200) {
                          accountsJsonIn = JSON.parse(body);
                          console.log(accountsJsonIn);

                          accountId = accountsJsonIn['results'][0].account_id;

                          getBalanceUrl = getAccountsUrl + '/' + accountId + '/balance';

                          request.get({
                              url: getBalanceUrl,
                              headers: {Authorization: bearerToken}
                          }, function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    balanceJsonIn = JSON.parse(body);
                                    console.log(balanceJsonIn);

                                    getTransactionsUrl = getAccountsUrl + '/' + accountId + '/transactions';

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

})*/


/************************  Citizen Truelayer - Crime  ************************/
/*
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
*/
/*
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
*/

router.get('/citizen-truelayer-crime/multibank', function (req, res) {

  var multiBank = req.query.multibank

  if (multiBank === 'yes') {
    res.redirect('/citizen-truelayer-crime/obmultiple-yes')
  } else {
    res.render('citizen-truelayer-crime/identify-income')
  }
})

router.get('/citizen-truelayer-crime/suitable-for-ob', function (req, res) {

  var suitable = req.query.suitable

  if (suitable === 'yes') {
    res.redirect('/citizen-truelayer-crime/obbank')
  } else {
    res.render('citizen-truelayer-crime/identify-income')
  }
})


router.get('/citizen-truelayer-crime/cash', function (req, res) {

  var cash = req.query.cash

  if (cash === 'yes') {
    res.redirect('/citizen-truelayer-crime/cash-amount')
  } else {
    res.render('citizen-truelayer-crime/benefits-kind')
  }
})

router.get('/citizen-truelayer-crime/benefitsinkind', function (req, res) {

  var benefitsinkind = req.query.benefitsinkind

  if (benefitsinkind === 'yes') {
    res.redirect('/citizen-truelayer-crime/benefits-kind-amount')
  } else {
    res.render('citizen-truelayer-crime/identify-outgoings')
  }
})

router.get('/citizen-truelayer-crime/ownsproperty', function (req, res) {

  var ownsproperty = req.query.ownsproperty

  if (ownsproperty === 'yes') {
    res.redirect('/citizen-truelayer-crime/property-amount')
  } else {
    res.render('citizen-truelayer-crime/capital-assets')
  }
})


router.get('/citizen-truelayer-crime/ownsproperty', function (req, res) {

  var ownsproperty = req.query.ownsproperty

  if (ownsproperty === 'yes') {
    res.redirect('/citizen-truelayer-crime/property-amount')
  } else {
    res.render('citizen-truelayer-crime/capital-assets')
  }
})

router.get('/citizen-truelayer-crime/has-other-capital', function (req, res) {

  var hasOtherCapital = req.query.hasOtherCapital

  if (hasOtherCapital === 'yes') {
    res.redirect('/citizen-truelayer-crime/national-savings')
  } else {
    res.render('citizen-truelayer-crime/means-result')
  }
})

router.get('/citizen-truelayer-crime/has-national-savings', function (req, res) {

  var hasNationalSavings = req.query.hasNationalSavings

  if (hasNationalSavings === 'yes') {
    res.redirect('/citizen-truelayer-crime/national-savings-amount')
  } else {
    res.render('citizen-truelayer-crime/premium-bonds')
  }
})

router.get('/citizen-truelayer-crime/has-premium-bonds', function (req, res) {

  var hasPremiumBonds = req.query.hasPremiumBonds

  if (hasPremiumBonds === 'yes') {
    res.redirect('/citizen-truelayer-crime/premium-bonds-amount')
  } else {
    res.render('citizen-truelayer-crime/capital-bonds')
  }
})

router.get('/citizen-truelayer-crime/has-capital-bonds', function (req, res) {

  var hasCapitalBonds = req.query.hasCapitalBonds

  if (hasCapitalBonds === 'yes') {
    res.redirect('/citizen-truelayer-crime/capital-bonds-amount')
  } else {
    res.render('citizen-truelayer-crime/stocks-shares')
  }
})

router.get('/citizen-truelayer-crime/has-stocks-shares', function (req, res) {

  var hasStocksShares = req.query.hasStocksShares

  if (hasStocksShares === 'yes') {
    res.redirect('/citizen-truelayer-crime/stocks-shares-amount')
  } else {
    res.render('citizen-truelayer-crime/other-savings')
  }
})

router.get('/citizen-truelayer-crime/has-other-savings', function (req, res) {

  var hasOtherSavings = req.query.hasOtherSavings

  if (hasOtherSavings === 'yes') {
    res.redirect('/citizen-truelayer-crime/other-savings-amount')
  } else {
    res.render('citizen-truelayer-crime/means-result')
  }
})

router.get('/citizen-truelayer-crime/assets', function (req, res) {

  var checkboxes = req.query.assets

  if (checkboxes === '_unchecked'){
    res.redirect('/citizen-truelayer-crime/means-result')
  }
  else{
    res.render('citizen-truelayer-crime/capitalshares', {assets:checkboxes})
  }
})


/*router.get('/citizen-truelayer-crime/bank-success', function (req, res, next) {

  var domain = req.hostname;

  if (domain=='localhost'){
    var redirect_uri = 'http://' + domain + ':3000/citizen-truelayer-crime/bank-success'
  }
  else{
    var redirect_uri = 'https://laa-atp-express-evidence-proto.herokuapp.com/citizen-truelayer-crime/bank-success'
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
              var accountId;
              var getAccountsUrl = 'https://api.truelayer.com/data/v1/accounts';
              var getBalanceUrl;
              var getTransactionsUrl;

              var bearerToken = "Bearer " + token;

              request.get({
                  url: getAccountsUrl,
                  headers: {Authorization: bearerToken}
                }, function (error, response, body) {
                      if (!error && response.statusCode == 200) {
                          accountsJsonIn = JSON.parse(body);
                          console.log(accountsJsonIn);

                          accountId = accountsJsonIn['results'][0].account_id;

                          getBalanceUrl = getAccountsUrl + '/' + accountId + '/balance';

                          request.get({
                              url: getBalanceUrl,
                              headers: {Authorization: bearerToken}
                          }, function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    balanceJsonIn = JSON.parse(body);
                                    console.log(balanceJsonIn);

                                    getTransactionsUrl = getAccountsUrl + '/' + accountId + '/transactions';

                                    request.get({
                                      url: getTransactionsUrl,
                                      headers: {Authorization: bearerToken}
                                    }, function (error, response, body) {
                                          if (!error && response.statusCode == 200) {
                                              transactionsJsonIn = JSON.parse(body);
                                              console.log(transactionsJsonIn);

                                              res.render('citizen-truelayer-crime/bank-success', {accounts: accountsJsonIn, balance: balanceJsonIn, transactions: transactionsJsonIn});

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

})*/

/****************************  Solicitor  ****************************/


router.get('/solicitor/newOrResume', function (req, res) {

  var newOrResume = req.query.newOrResume

  if (newOrResume === 'new') {
    res.redirect('/solicitor/application-type')
  } else {
    res.render('solicitor/case-dashboard')
  }
})

router.get('/solicitor/selectCivilCategory', function (req, res) {

  var applicationType = req.query.applicationType

  if (applicationType === 'Civil') {
    res.redirect('/solicitor/category-law-civil')
  } else {
    res.render('solicitor/case-type-crime')
  }
})

router.get('/solicitor/employed-status', function (req, res) {

  var employed = req.query.employed

  if (employed === 'Yes') {
    res.redirect('/solicitor/basic-details')
  } else {
    res.render('solicitor/unemployed-three-months')
  }
})

router.get('/solicitor/stock-evidence-method', function (req, res) {

  var method = req.query.stockEvidenceMethod

  if (method === 'file') {
    res.redirect('/solicitor/document-upload-type')
  } else {
    res.render('solicitor/photo-evidence-stocks-type')
  }
})

router.get('/solicitor/property-evidence-method', function (req, res) {

  var method = req.query.propertyEvidenceMethod

  if (method === 'file') {
    res.redirect('/solicitor/document-upload-type-property')
  } else {
    res.render('solicitor/photo-evidence-property-type')
  }
})

/*outer.get('/solicitor/find-address', function (req, res, next) {

  console.warn('start')

  var postcodeLookupUrl = 'https://api.getAddress.io/find/'
  var postcode = req.query['postcode']
  var postcodeNoSpaces = postcode.replace(/\s/g, '')
  var postcodeApiKey = '48wlp1Lx7EC_fIcqSIeL2w13450'

  var postcodeApiUrl = postcodeLookupUrl+postcode+'?api-key='+postcodeApiKey

  var jsonIn

  console.log(postcodeLookupUrl)
  console.log(postcode)
  console.log(postcodeApiUrl)

  request.get({
          url: postcodeApiUrl
        },
        function (error, response, body) {
          if (!error && response.statusCode == 200) {
              console.log('success')
              jsonIn = JSON.parse(body);
              console.log(jsonIn);

              res.render('solicitor/select-address', {addresses: jsonIn});
          }
          else {
              console.log("There was an error: ") + response.statusCode;
              console.log(body);
              res.redirect('/solicitor/select-address');
          }
        }
)

res.redirect('/solicitor/select-address');

});
*/



/************************  Citizen Openworks  ************************/

router.get('/citizen-openwrks/obbank', function (req, res) {

  console.log("users: " + usersJSON)
  console.log("accounts: " + accountsJSON)
  console.log("transactions: " + transactionsJSON)

  res.render('citizen-openwrks/obbank', {users: usersJSON, accounts: accountsJSON, transactions: transactionsJSON});

})

router.get('/citizen-openwrks/multibank', function (req, res) {

  var multiBank = req.query.multibank

  if (multiBank === 'yes') {
    res.redirect('/citizen-openwrks/obmultiple-yes')
  } else {
    res.render('citizen-openwrks/identify-income')
  }
})

router.get('/citizen-openwrks/suitable-for-ob', function (req, res) {

  var suitable = req.query.suitable

  if (suitable === 'yes') {
    res.redirect('/citizen-openwrks/obbank-start')
  } else {
    res.render('citizen-openwrks/identify-income')
  }
})


router.get('/citizen-openwrks/cash', function (req, res) {

  var cash = req.query.cash

  if (cash === 'yes') {
    res.redirect('/citizen-openwrks/cash-amount')
  } else {
    res.render('citizen-openwrks/benefits-kind')
  }
})

router.get('/citizen-openwrks/benefitsinkind', function (req, res) {

  var benefitsinkind = req.query.benefitsinkind

  if (benefitsinkind === 'yes') {
    res.redirect('/citizen-openwrks/benefits-kind-amount')
  } else {
    res.render('citizen-openwrks/identify-outgoings')
  }
})

router.get('/citizen-openwrks/ownsproperty', function (req, res) {

  var ownsproperty = req.query.ownsproperty

  if (ownsproperty === 'yes') {
    res.redirect('/citizen-openwrks/property-amount')
  } else {
    res.render('citizen-openwrks/capital-assets')
  }
})


router.get('/citizen-openwrks/ownsproperty', function (req, res) {

  var ownsproperty = req.query.ownsproperty

  if (ownsproperty === 'yes') {
    res.redirect('/citizen-openwrks/property-amount')
  } else {
    res.render('citizen-openwrks/capital-assets')
  }
})

router.get('/citizen-openwrks/has-other-capital', function (req, res) {

  var hasOtherCapital = req.query.hasOtherCapital

  if (hasOtherCapital === 'yes') {
    res.redirect('/citizen-openwrks/national-savings')
  } else {
    res.render('citizen-openwrks/means-result')
  }
})

router.get('/citizen-openwrks/has-national-savings', function (req, res) {

  var hasNationalSavings = req.query.hasNationalSavings

  if (hasNationalSavings === 'yes') {
    res.redirect('/citizen-openwrks/national-savings-amount')
  } else {
    res.render('citizen-openwrks/premium-bonds')
  }
})

router.get('/citizen-openwrks/has-premium-bonds', function (req, res) {

  var hasPremiumBonds = req.query.hasPremiumBonds

  if (hasPremiumBonds === 'yes') {
    res.redirect('/citizen-openwrks/premium-bonds-amount')
  } else {
    res.render('citizen-openwrks/capital-bonds')
  }
})

router.get('/citizen-openwrks/has-capital-bonds', function (req, res) {

  var hasCapitalBonds = req.query.hasCapitalBonds

  if (hasCapitalBonds === 'yes') {
    res.redirect('/citizen-openwrks/capital-bonds-amount')
  } else {
    res.render('citizen-openwrks/stocks-shares')
  }
})

router.get('/citizen-openwrks/has-stocks-shares', function (req, res) {

  var hasStocksShares = req.query.hasStocksShares

  if (hasStocksShares === 'yes') {
    res.redirect('/citizen-openwrks/stocks-shares-amount')
  } else {
    res.render('citizen-openwrks/other-savings')
  }
})

router.get('/citizen-openwrks/has-other-savings', function (req, res) {

  var hasOtherSavings = req.query.hasOtherSavings

  if (hasOtherSavings === 'yes') {
    res.redirect('/citizen-openwrks/other-savings-amount')
  } else {
    res.render('citizen-openwrks/means-result')
  }
})

router.get('/citizen-openwrks/assets', function (req, res) {

  var checkboxes = req.query.assets

  if (checkboxes === '_unchecked'){
    res.redirect('/citizen-openwrks/means-result')
  }
  else{
    res.render('citizen-openwrks/capitalshares', {assets:checkboxes})
  }
})


router.get('/citizen-openwrks/bank-redirect', function (req, res) {

  var options = { method: 'POST',
    url: 'https://api.openwrks.com/surface/v1/invite',
    headers:
     { Authorization: 'Bearer 59fc47463c4f660001196541b50f6b539894422785e562e5e6b2de9e',
       'Content-Type': 'application/json' },
    body:
     { customerReference: 'LAA',
       redirectUrl: 'http://localhost:3000/citizen-openwrks/obbank' },
    json: true };


  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);

    var flowURL = body.flowUrl;

    console.log(flowURL);

       var users = { method: 'GET',
        url: 'https://api.openwrks.com/surface/v1/Users',
        headers:
         { Authorization: 'Bearer 59fc47463c4f660001196541b50f6b539894422785e562e5e6b2de9e',
           'Content-Type': 'application/json' }};

        request(users, function (error, response, body) {
          if (error) throw new Error(error);

          console.log(body);

          usersJSON = JSON.parse(body);

          var userId = usersJSON.data[0].userId   //'d96a33ef-c4ca-43c2-ad30-2e7678378900';

          var accounts = { method: 'GET',
            url: 'https://api.openwrks.com/surface/v1/users/'+userId+'/Accounts',
            headers:
             { Authorization: 'Bearer 59fc47463c4f660001196541b50f6b539894422785e562e5e6b2de9e',
               'Content-Type': 'application/json' }};

              request(accounts, function (error, response, body) {
                  if (error) throw new Error(error);

                  accountsJSON = JSON.parse(body);

                  var accountId = accountsJSON.data[0].accountId//'a8c3f1c7-47db-42ee-96c1-bbb39f14fd25';

                  console.log(body);

                  var transactions = { method: 'GET',
                    url: 'https://api.openwrks.com/surface/v1/users/' + userId + '/accounts/'+ accountId +'/Transactions',
                    headers:
                     { Authorization: 'Bearer 59fc47463c4f660001196541b50f6b539894422785e562e5e6b2de9e',
                       'Content-Type': 'application/json' }};

                       request(transactions, function (error, response, body) {
                         if (error) throw new Error(error);

                         transactionsJSON = JSON.parse(body);

                         console.log(body);

                  });

              });

        });

    res.redirect(flowURL)

  });

})


/*********************************************************************/

module.exports = router
