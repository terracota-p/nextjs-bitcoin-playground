# Nextjs bitcoin playground

A small custodial wallet app that demos an end-to-end purchase of bitcoin with fiat.

Deployed to <https://nextjs-bitcoin-playground.vercel.app/> (not connected to a bitcoind, so get balance and purchase features don't work. Run locally to get all features).

Contents:

- [Nextjs bitcoin playground](#nextjs-bitcoin-playground)
  - [Install](#install)
  - [Test](#test)
  - [Run](#run)
    - [Prerequisite: bitcoind](#prerequisite-bitcoind)
  - [Code organization](#code-organization)
  - [Tech](#tech)
  - [Tech debt](#tech-debt)

## Install

```sh
npm ci
```

## Test

```sh
# unit
npm test
# E2E - requires a bitcoind running locally in regtest mode (see below)
npm run test-e2e
```

## Run

```sh
# requires a bitcoind running locally in regtest mode (see below)
npm run dev
```

### Prerequisite: bitcoind

Run bitcoind locally in regtest mode:

```sh
# set up bitcoin.conf, eg:
$ cat $HOME/Library/Application\ Support/Bitcoin/bitcoin.conf
rpcuser=usr
rpcpassword=pwd
fallbackfee=0.00001
# start bitcoind
$ bitcoind -regtest -daemon
# generate blocks in chain and get BTC to spend in the app central wallet (new address generated)
$ bitcoin-cli -regtest createwallet app-central-wallet
$ bitcoin-cli -regtest loadwallet app-central-wallet true
$ bitcoin-cli -regtest generatetoaddress 101 $(bitcoin-cli -regtest getnewaddress)
$ bitcoin-cli -regtest getbalance
50.00000000
```

Refs:

- [intro](https://developer.bitcoin.org/examples/intro.html)
- [testing](https://developer.bitcoin.org/examples/testing.html)

## Code organization

Based on [nextjs conventions](https://nextjs.org/docs/getting-started/project-structure) and [clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html):

- `app/` - code (and unit tests as `*.spec.js` along tested code, as specs)
  - `api/` - backend API endpoints
  - `lib/` - domain code
    - `repository/` - adapters for external interfaces (eg: DBs, API clients)
  - `ui/` - UI components
  - others (eg: `wallet/`, `link-bank-account/`) - web (pages, server actions)
- `e2e-tests/` - E2E tests
- `public/` - static assets

## Tech

Selected tools:

- web - [nextjs](https://nextjs.org/) - a renowned framework I hadn't yet tried that meets the requirements (node + react)
- auth - Auth0 - an established, simple to set up auth provider with a suitable free plan
  - alternatives considered:
    - <https://authjs.dev/> - similar, currently in beta (previously <https://next-auth.js.org/>)
- deployment - Vercel - where deploying is straightforward, with a suitable free plan
- DB - PostgreSQL - a reliable SQL DB that's included in vercel free plan
  - alternatives considered:
    - mongodb (no need for DB migrations, the app manages the shape of stored objects)
- unit tests - Vitest - a really nice one, including mocking (without the headaches)
- E2E tests - Playwright - works very well in my experience
  - alternatives considered: cypress
- bitcoin - call bitcoind API endpoints - [example](https://developer.bitcoin.org/reference/rpc/getnewaddress.html)
  - alternatives considered:
    - [bitcoinjs-lib](https://www.npmjs.com/package/bitcoinjs-lib) - good but too low level
    - [bitcore](https://github.com/bitpay/bitcore) - looks good, didn't have a chance to try it

## Tech debt

Things to do before this app would be production-ready:

- test unhappy scenarios
- add form data validation
- error handling
  - throw specific errors for different handling scenarios (eg: log BadRequest at `warn` level, 500 errors at `error`)
  - customized [error page](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- improve UX (styles, etc)
- test with testnet and then real bitcoin networks
- ensure privacy (depending on requirements, eg: using emails as user id or logging them might not be appropriate in a real app with a focus on privacy):
  - logs clean up
  - generate user uuid on signup, use it instead of email as user id
- set up monitoring & alerting
- see also `XXX` marks in code (as low priority to-dos to be addressed later on)
