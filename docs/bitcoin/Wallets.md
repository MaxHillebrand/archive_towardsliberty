---
{
  "title": Wallets",
  "description": "An analysis of different wallets to manage private keys and build Bitcoin transactions. Towards Liberty is an archive of knowledge about Bitcoin, Economics and Natural Law."
}
---

# Wallets

[[toc]]

## Introduction

Wallets are tools to generate and backup the secrets that protect the property rights in bitcoin.
They further generate public keys and addresses, which are publicly verifiable property rights definitions.
In combination with a [full node](/bitcoin/FullNode.md) a wallet can find the past transactions and the currently available unspent transaction outputs.
The wallet will construct and sign a transaction which consumes UTXOs in the input, and generates new coins in the output, thus transferring the property rights title of bitcoin.
The two important aspects of a wallet to consider is security and privacy.

## Types of Wallets

### Hot Wallets

A hot wallet is a software which generates and stores the private key on a device connected to the internet.
There are possible attack vectors which can lead to a leak of the private key from an remote hacker, though they are rare.

- [Bitcoin Core Wallet](https://bitcoincore.org)
- [Electrum Bitcoin Wallet](https://electrum.org) for Linux, Windows, MacOS
- [Wasabi Wallet](https://wasabiwallet.io) for Linux, Windows, MacOS, privacy focused
- [Green Wallet](https://blockstream.com/green) for Android, iOS, & browser extension

### Hardware Wallets

A hardware wallet is a dedicated computer which is specialized in generating true entropy and producing secure private keys completely offline.
They must be managed together with a software wallet in order to discover if the wallet has received coins, and to build the unsigned transaction.
However, the private keys, and thus the act of signing a transaction, are only kept on the hardware device itself.

- [Cold Card](https://coldcardwallet.com)
- [Trezor](https://trezor.io) and [Setup guide for Linux](https://github.com/SomberNight/electrum/blob/hw_wallet_guide/contrib/hw_wallet.md)
- [Ledger](https://ledger.com) and [Setup guide for Linux](https://github.com/SomberNight/electrum/blob/hw_wallet_guide/contrib/hw_wallet.md)
- [Opendime](https://opendime.com)

## Private Key Backup

Regardless how the private key was generated, it should be backed up securely, in case the main device is lost or corrupted.
Don't back up your keys on hardware connected to the internet, and especially not the cloud.
Use old school pen and paper, with long-lasting inc, best to laminate for water resistance as well.
You should consider physical safety and fire protection with a decent safe.

- Back up fire resistant with [Blockstream Metal](https://store.blockstream.com/product/blockstream-metal/), [Cryptosteel](https://cryptosteel.com/), or do it yourself with a [metal letter stamp](https://duckduckgo.com/?q=metal%2Bletter%2Bstamps&t=canonical&atb=v1-1&ia=web)
- Maybe in the future after more research and testing, use Shamir's Secret Sharing to securely split up your seed into m-of-n parts. This is #reckless... [Satoshi Lab's implementation](https://github.com/satoshilabs/slips/blob/master/slip-0039.md#decryption-of-the-master-secret), [Ian Coleman's implementation](https://iancoleman.io/shamir39/), [Ron Raiter's implementation](https://github.com/ronreiter/multicrypt)
- Encrypt your backup seed with [BIP 39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#from-mnemonic-to-seed) "25th word"
- Do visual encryption with the [Revealer](https://revealer.cc/) or by [steganography](https://incoherency.co.uk/stegoseed/)
- [Smart Custody](https://github.com/BlockchainCommons/SmartCustodyWhitePapers)

