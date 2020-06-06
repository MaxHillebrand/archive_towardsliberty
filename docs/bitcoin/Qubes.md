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

## On sys VMs

After a proper installation, Qubes will have generated multiple virtual machines that will manage different important tasks of the operating system inherently compartmentalized.
The defaults are pretty good, and these should not be messed with too much by an inexperienced user.
These sys VMs should be run at launch and should be kept running all the time.

### dom0

This is the operating system that is installed "bare metal" on the hardware itself.
It has full admin rights to the whole computer, and thus it is critical to keep this VM clean and secure.
From this fedora based VM, other VMs can be created, booted and destroyed.

### sys-net

Is used to connect the computer to the internet, it manages wifi cards and ethernet ports.
Only sys-firewall should connect to sys-net, no other VM should connect to it.

### sys-firewall

Is an additional layer of defense to separate VMs one step from sys-net directly.
AppVMs will connect to sys-firewall, which will forward the traffic to sys-net, so that the AppVm can access the internet.

### sys-whonix

Is a whonix gateway virtual machine that connects to sys-firewall.
It routes all traffic off VMs connected to it through the Tor network.
You can set a VM to connect to sys-whnoix with the command in dom0: `qvm-prefs --set <AppVM> netvm sys-whonix`.

### sys-usb

Is a VM dedicated to manage the usb ports.
This means, if you connect a usb device, at first it is only connected to sys-usb.
Next, you have to manually specify the AppVM that the usb device should connect to.
Sys-usb thus ensures that the usb device does not get access to just any AppVM, only the one you specify.
List all attached usb devices by executing in dom0: `qvm-usb list`, and attack them to an AppVM by executing in dom0: `qvm-usb attack <AppVM> sys-usb:<DEVID>'.

## On template VMs

Template VMs are where new software is installed, and on which AppVMs are based.
By default, there are templates for Debian, Fedora and Whonix installed.
Make sure that these are always up to date by utilizing the Qubes update manager.
However, do not install random software in these base templated, because any software you will install here, will be used by all AppVMs that are based on it.
Rather, only install software that you will need in any case, like for exmaple vim in the whonix-ws template.

If you want to install a new software, that you do not want to use on every AppVM, then it is best to create a new template VM.
First, clone the initial template VM in dom0 with `qvm-clone <name of old template VM> <name of new template VM>`.
Now open the terminal in the new template VM by executing in dom0: `qvm-run <name o fnew template VM> gnome-terminal`.
Next install what ever software you want to.
However, do not run the software itself in this template VM, this should only be done in AppVMs. 
