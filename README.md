# Bitcoin wallet

A small custodial wallet app that demos an end-to-end purchase of bitcoin with fiat.

Contents:

- [Bitcoin wallet](#bitcoin-wallet)
  - [Install](#install)
  - [Test, run](#test-run)
  - [Tech](#tech)

## Install

```sh
npm ci
```

## Test, run

<!-- TODO test -->

```sh
npm run dev
```

## Tech

Selected tools:

- web - [nextjs](https://nextjs.org/) - a renowned framework I hadn't yet tried that meets the requirements (node + react)
- auth - Auth0 - an established, simple to set up auth provider with a suitable free plan
  - alternatives considered:
    - <https://authjs.dev/> - similar, currently in beta (previously <https://next-auth.js.org/>)
- deployment - Vercel - where deploying is straightforward, with a suitable free plan
- TODO ...
