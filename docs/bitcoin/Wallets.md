---
{
  "title": Wallets",
  "description": "An analysis of different wallets to manage private keys and build Bitcoin transactions. Towards Liberty is an archive of knowledge about Bitcoin, Economics and Natural Law."
}
---

# Wallets

[[toc]]

## Hot Wallets

- [Bitcoin Core Wallet](https://bitcoincore.org)
- [Electrum Bitcoin Wallet](https://electrum.org) for Linux, Windows, MacOS
- [Wasabi Wallet](https://wasabiwallet.io) for Linux, Windows, MacOS, privacy focused
- [Green Wallet]() for Android, iOS, & browser extension

## Hardware Wallets

- [Cold Card](https://coldcardwallet.com)
- [Trezor](https://trezor.io) and [Setup guide for Linux](https://github.com/SomberNight/electrum/blob/hw_wallet_guide/contrib/hw_wallet.md)
- [Ledger](https://ledger.com) and [Setup guide for Linux](https://github.com/SomberNight/electrum/blob/hw_wallet_guide/contrib/hw_wallet.md)
- [Opendime](https://opendime.com)

## Cold Storage

- [Glacier Protocol](https://glacierprotocol.org/)
- [Paper Wallet Generator](https://github.com/iancoleman/bip39), [Coin Glacier](https://coinglacier.org/) and [tutorial](https://99bitcoins.com/create-99-9-secure-bitcoin-paper-wallet/)
- [Bitcoin Storage & Security 101](https://www.youtube.com/watch?v=nYm8ROOSRCk&feature=youtu.be), by Pamela Morgan
- [Key Generation With Dice](http://ryndon.com/2017/03/16/use-16-sided-hex-dice-to-create-a-bitcoin-address/)
- [Subzero](https://medium.com/square-corner-blog/open-sourcing-subzero-ee9e3e071827), by Alok Menghrajani
- [The Business of Cold Storage](https://medium.com/@timevalueofbtc/the-business-of-bitcoin-cold-storage-148fba7f1255), by Nik Bathia

## Private Key Backup

Don't back up your keys on hardware connected to the internet, and especially not the cloud.
Use old school pen and paper, with long-lasting inc, best to laminate for water resistance as well.
You should consider physical safety and fire protection with a decent safe.

- Back up fire resistant with [Blockstream Metal](https://store.blockstream.com/product/blockstream-metal/), [Cryptosteel](https://cryptosteel.com/), or do it yourself with a [metal letter stamp](https://duckduckgo.com/?q=metal%2Bletter%2Bstamps&t=canonical&atb=v1-1&ia=web)
- Maybe in the future after more research and testing, use Shamir's Secret Sharing to securely split up your seed into m-of-n parts. This is #reckless... [Satoshi Lab's implementation](https://github.com/satoshilabs/slips/blob/master/slip-0039.md#decryption-of-the-master-secret), [Ian Coleman's implementation](https://iancoleman.io/shamir39/), [Ron Raiter's implementation](https://github.com/ronreiter/multicrypt)
- Encrypt your backup seed with [BIP 39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#from-mnemonic-to-seed) "25th word"
- Do visual encryption with the [Revealer](https://revealer.cc/) or by [steganography](https://incoherency.co.uk/stegoseed/)
- [Smart Custody](https://github.com/BlockchainCommons/SmartCustodyWhitePapers)

