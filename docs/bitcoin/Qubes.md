---
{
  "title": "Qubes",
  "description": "Reasons, best practices and tips to use the Qubes operating system. Towards Liberty is an archive of knowledge about Bitcoin, Economics and Natural Law."
}
---
 
# Qubes

[[toc]]

---

## Introduction

[Qubes](https://qubes-os.org) is a reasonably secure operating system.
It is a free and open source software with a focus on secure compartmentalization and serious privacy.
The design goal is to separate different parts of your cyberspace life into independent virtual machines.
It is like having a dedicated computer for browsing the web, another for running chat apps, and another to do work related tasks.
If one of the computer breaks or gets compromised, then the others are not affected.
However, instead of needing to buy new hardware for each task, the separation is done inside the operating system on one physical computer.

Checkout the very thorough [Qubes documentation](https://qubes-os.org/docs) for in depth analysis and guides on the whole OS.

## Installation

Unfortunately, Qubes does not run on every hardware, so check the [hardware compatibility list](https://qubes-os.org/hcl) to see if another contributor has verified that the OS works on your specific computer.
The gist of it is, **more RAM = more better**.
8GB RAM is the bare minimum, 16GB RAM is comfortable, 32GB RAM is reasonable, but why not 128GB RAM?!
[Installing Qubes](https://qubes-os.org/doc/installation-guide) should be pretty straight forward, make sure to verify the PGP signature of the iso file and to set a secure password for the luks disk encryption and user.

