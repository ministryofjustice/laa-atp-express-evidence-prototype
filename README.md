
# LAA ATP User Services Prototype
Initially intended as a prototype of a service to gather data and evidence to support means assessments for civil and criminal legal aid using DWP, HMRC and Open Banking APIs .

This has evolved into a prototype for an end-to-end service which also includes entering client details, case details, and merits data, and allows both the solicitor and citizen to access the service.

## Version History

To see the prototype at any given point in time, checkout the appropriate tagged commit and access the local version at the given URL.

06/03/2018 - civil-v1 - Initial version of civil prototype for first round of testing with civil legal aid solicitors
* Tag: https://github.com/ministryofjustice/laa-atp-express-evidence-prototype/commit/159959304e5e9ca3defb8407b3618a7647af8e41
* URL: http://localhost:3000/civil/start

12/03/2018 - generic-v1 - Initial version of generic prototype for first round of testing with citizens who have no experience of the legal aid process
* Tag: https://github.com/ministryofjustice/laa-atp-express-evidence-prototype/commit/dd224a63b8574811b37158060f9c7419fbfc2710
* URL: http://localhost:3000/generic/start

13/03/2018 - civil-v2/crime-v1 - Revised civil prototype/initial crime prototype for testing with combined civil/criminal legal aid solicitors
* Tag: https://github.com/ministryofjustice/laa-atp-express-evidence-prototype/commit/7476dd09858afbc17962487d4ec9fe41c1adffe6
* URL: http://localhost:3000/civil/start / http://localhost:3000/crime/start

19/03/2018 - generic-v2 - Second version of generic prototype for first round of testing with citizens who have no experience of the legal aid process
* Tag: https://github.com/ministryofjustice/laa-atp-express-evidence-prototype/commit/2ad386f4aaf61f30fae53f0f0bbb018ed96fda83
* URL: http://localhost:3000/generic/start

26/03/2018 - generic-v3 - Third round of generic testing
* Tag: https://github.com/ministryofjustice/laa-atp-express-evidence-prototype/commit/c6fe2d1b91fc28d1972fdeb042c550e13cc111a0
* URL: http://localhost:3000/generic/start

28/03/2018 - crime-v2 - Second round of crime testing - introduce remote functionality, to allow citizens to complete part of the journey independently
* Tag: https://github.com/ministryofjustice/laa-atp-express-evidence-prototype/commit/f0bb879caef34224d36e24990849793c8bec2569
* URL: http://localhost:3000/crime-remote/start

09/04/2018 - generic-v4 - Fourth round of generic testing - introduce Truelayer open banking screens
* Tag: https://github.com/ministryofjustice/laa-atp-express-evidence-prototype/commit/d66812912c785eb8ada038538a8554ac31e06f2c
* URL: http://localhost:3000/generic-truelayer/start

24/05/2018 - end-to-end-civil-v1 - First round of testing using new end to end/remote civil process
* Tag: https://github.com/ministryofjustice/laa-atp-express-evidence-prototype/commit/a49daec493c54d87346d2f9b1fa20d0404fc8a1b
* URL: http://localhost:3000/solicitor/start / http://localhost:3000/citizen-truelayer/start


## Hosted Prototypes

https://laa-atp-express-evidence-proto.herokuapp.com/civil/start

https://laa-atp-express-evidence-proto.herokuapp.com/crime/start

https://laa-atp-express-evidence-proto.herokuapp.com/generic/start

https://laa-atp-express-evidence-proto.herokuapp.com/crime-remote/start

https://laa-atp-express-evidence-proto.herokuapp.com/solicitor/start

https://laa-atp-express-evidence-proto.herokuapp.com/citizen-truelayer/start

## All prototypes built using the GOV.UK Prototype kit. See below for details:

# GOV.UK Prototype kit · [![Greenkeeper badge](https://badges.greenkeeper.io/alphagov/govuk_prototype_kit.svg)](https://greenkeeper.io/)

Go to the [GOV.UK Prototype Kit site](https://govuk-prototype-kit.herokuapp.com/docs) to download the latest version and read the documentation.

## About the prototype kit

The prototype kit provides a simple way to make interactive prototypes that look like pages on GOV.UK. These prototypes can be used to show ideas to people you work with, and to do user research.

Read the [project principles](https://govuk-prototype-kit.herokuapp.com/docs/principles).

## Security

If you publish your prototypes online, they **must** be protected by a [username and password](https://govuk-prototype-kit.herokuapp.com/docs/publishing-on-heroku). This is to prevent members of the public finding prototypes and thinking they are real services.

You must protect user privacy at all times, even when using prototypes. Prototypes made with the kit look like GOV.UK, but do not have the same security provisions. Always make sure you are handling user data appropriately.

## Installation instructions

- [Installation guide for new users (non technical)](https://govuk-prototype-kit.herokuapp.com/docs/install/introduction)
- [Installation guide for developers (technical)](https://govuk-prototype-kit.herokuapp.com/docs/install/developer-install-instructions)

## Community

We have two Slack channels for the Prototype kit. You'll need a government email address to join them.

* [Slack channel for users of the prototype kit](https://ukgovernmentdigital.slack.com/messages/prototype-kit/)
* [Slack channel for developers of the prototype kit](https://ukgovernmentdigital.slack.com/messages/prototype-kit-dev/)
