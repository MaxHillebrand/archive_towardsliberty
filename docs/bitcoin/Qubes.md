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

## Sys VMs

After a proper installation, Qubes will have generated multiple virtual machines that will manage different important tasks of the operating system inherently compartmentalized.
The defaults are pretty good, and these should not be messed with too much by an inexperienced user.
These sys VMs should be run at launch and should be kept running all the time.

### dom0

This is the operating system that is installed "bare metal" on the hardware itself.
It has full admin rights to the whole computer, and thus it is critical to keep this VM clean and secure.
From this fedora based VM, other VMs can be created, booted and destroyed.
VMs can be booted with `qvm-start <name of VM>` and shutdown with `qvm-shutdown <name of VM>`.

### sys-net

Is used to connect the computer to the internet, it manages wifi cards and ethernet ports.
Only sys-firewall should connect to sys-net, no other VM should connect to it.

### sys-firewall

Is an additional layer of defense to separate VMs one step from sys-net directly.
App VMs will connect to sys-firewall, which will forward the traffic to sys-net, so that the app VM can access the internet.

### sys-whonix

Is a whonix gateway virtual machine that connects to sys-firewall.
It routes all traffic off VMs connected to it through the Tor network.
You can set a VM to connect to sys-whnoix with the command in dom0: `qvm-prefs --set <AppVM> netvm sys-whonix`.

### sys-usb

Is a VM dedicated to manage the usb ports.
This means, if you connect a usb device, at first it is only connected to sys-usb.
Next, you have to manually specify the app VM that the usb device should connect to.
Sys-usb thus ensures that the usb device does not get access to just any app VM, only the one you specify.
List all attached usb devices by executing in dom0: `qvm-usb list`, and attack them to an app VM by executing in dom0: `qvm-usb attack <app VM> sys-usb:<DEVID>'.

## Template VMs

Template VMs are where new software is installed, and on which AppVMs are based.
By default, there are templates for Debian, Fedora and Whonix installed.
Make sure that these are always up to date by utilizing the Qubes update manager.
However, do not install random software in these base templated, because any software you will install here, will be used by all AppVMs that are based on it.
Rather, only install software that you will need in any case, like for exmaple vim in the whonix-ws template.

If you want to install a new software, that you do not want to use on every AppVM, then it is best to create a new template VM.
First, clone the initial template VM in dom0 with `qvm-clone <name of old template VM> <name of new template VM>`.
Now open the terminal in the new template VM by executing in dom0: `qvm-run <name of new template VM> gnome-terminal`.
Next install what ever software you want to.
However, do not run the software itself in this template VM, this should only be done in AppVMs.

## App VMs

The software you engage with should mostly be booted in app VMs.
These are VMs which are based on template VMs, so any software that is installed in the template VM, can be run in the app VM.
You should not install new software in app VMs, in fact, any software that is installed in app VMs will be deleted on shutdown.
For example, if you want to have a dedicated app VM to access a browser, or any other standard software, then you can use the regular Debian, or Fedora, or Whonix template VMs.
But, if you want an app VM to run custom software, then base it on a template VM where you have installed this.
You can create app VMs by executing in dom0: `qvm-create <name of app VM> --template <name of template VM> --label <color>`.

Qubes is made to compartimentalize your computer, and it has it's greatest potential, when this concept is applied to the extreme.
Every software should have it's dedicated VM.
Even further, some website should have dedicated VMs too!
This is not just a security improvement, but also a productivity hack.
When for example GitHub and Twitter can only be accessed in two independent VMs, then the incentive to waste time on Twitter is drastically reduced.

## Disposable VMs

Disposable VMs are a special type of VM which clone an already existing VM [either app or template], boot it to run software, and upon shutdown, delete the entire VM.
This is especially useful for security and privacy focused tasks, where unnecessary metadata should be avoided.
For example, booting a disposable Whonix VM to access the Tor browser, and after use, deleting all possible metadata and logs.
Any VM can be made a template for disp VMs by executing in dom0: `qvm-prefs --set <name of VM> template_for_dispvms True`.
Now any software that is installed in this VM can be booted in a disposable environment by executing in dom0: `qvm-run --dispvm=<name of disp VM> <software to execute>`.

There are some important things to consider when using Whonix in disposable VMs, so please carefully [read the docs on how to](https://whonix.org/wiki/Qubes/DisposableVM).

## Alias' in dom0

As you can see by the command examples above, running a software in a VM can become a bit tedious.
A great productivity hack is to maintain an exhaustive collection of alias' in dom0.
These can be added at the end of the `~/.bashrc` file in dom0.
For example, launching a dedicated software in a dedicated VM becomes as easy as executing in dom0 `sgnl`, which is the alias for `alias sgnl='qvm-run signal signal-desktop'`.
Or, booting a disposable Whonix VM and running the Tor browser and fetching a dedicated .onion website is as easy as `explr`, due to `alias explr='qvm-run --dispvm=whonix-ws-dvm "torbrowser http://explorerzydxu5ecjrkwceayqybizmpjjznk5izmitf2modhcusuqlid.onion"'.

Another nice trick is to use more ellaborate bash scripts to handle more complex tasks.
These can be added in dom0 to `~/usr/local/bin/`, and made executable with `chmod +x`.
For example, with this script queries sys-usb for a YubiKey 2FA stick and connects it to the password manager VM, and running the terminal once it is complete.

```
#!/bin/bash

qvm-start -q sys-usb & qvm-start -q pass

RUNNING=$(qvm-ls | grep pass | grep Running | wc -l)
while [ $RUNNING -eq 0 ]; do sleep 1; RUNNING=$(qvm-ls | grep pass | grep Running | wc -l); done

device="`qvm-usb list | grep Yubico | awk '{ print $1 }'`"

sleep 2

qvm-usb attach pass "$device"

qvm-run pass gnome-terminal
```
