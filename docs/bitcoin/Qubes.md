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
[Installing Qubes](https://qubes-os.org/doc/installation-guide) should be pretty straight forward, make sure to verify the PGP signature of the iso file and to set a secure password for the luks disk encryption and user [notice there is no sudo password].

## Sys VMs

After a proper installation, Qubes will have generated multiple virtual machines that will manage different important tasks of the operating system inherently compartmentalized.
The defaults are pretty good, and these should not be messed with too much by an inexperienced user.
These sys VMs should be run automatically at launch and should be kept running all the time.

### dom0

This is the operating system that is installed "bare metal" on the hardware itself.
It has full admin rights to the whole computer, and thus it is critical to keep this VM clean and secure.
Notice that dom0 is not directly connected to the internet, and thus it cannot directly download and install software.
From this fedora based VM, other VMs can be created, booted and destroyed.
VMs can be booted with `qvm-start <name of VM>` and shutdown with `qvm-shutdown <name of VM>`.

### sys-net

Is used to connect the computer to the internet, it manages wifi cards and ethernet ports.
Only sys-firewall should connect to sys-net, no other VM should connect to it.

### sys-firewall

Is an additional layer of defense to separate VMs one step from sys-net directly.
App VMs will connect to sys-firewall, which will forward the traffic to sys-net, so that the app VM can access the internet.

Some VMs should not be connected to the internet at all, like for example your password manager, and this can be set in dom0 with `qvm-prefs --set <name of VM> netvm None`.

### sys-whonix

Is a whonix gateway virtual machine that connects to sys-firewall.
It routes all traffic off VMs connected to it through the Tor network.
You can set a VM to connect to sys-whnoix with the command in dom0: `qvm-prefs --set <name of VM> netvm sys-whonix`.

### sys-usb

Is a VM dedicated to manage the usb ports.
This means, if you connect a usb device, at first it is only connected to sys-usb.
Next, you have to manually specify the app VM that the usb device should connect to.
Sys-usb thus ensures that the usb device does not get access to simply any app VM, only the one you specify explicitly.
List all attached usb devices by executing in dom0: `qvm-usb list`, and attach them to an app VM by executing in dom0: `qvm-usb attack <name of app VM> sys-usb:<DEVID>'.

## Template VMs

Template VMs are where new software is installed, and on which AppVMs are based.
By default, there are templates for Debian, Fedora and Whonix installed.
Make sure that these are always up to date by utilizing the Qubes update manager.
However, do not install random software in these base templated, because any software you will install here, will be used by all AppVMs that are based on it.
Rather, only install software that you will need in any case, like for exmaple vim in the whonix-ws template, but be very careful with what you install in whonix-ws!

If you want to install a new software, that you do not want to use on every AppVM, then it is best to create a new template VM.
First, clone the initial template VM in dom0 with `qvm-clone <name of old template VM> <name of new template VM>`.
Now open the terminal in the new template VM by executing in dom0: `qvm-run <name of new template VM> gnome-terminal`.
Next, install what ever software you want to.
However, do not run the software itself in this template VM, this should only be done in app VMs.
  
### Minimal Template VMs
  
Default templates contain numerous applications pre-installed for convenience, however, this has both security as well as resource requirement constraints. There are unncessecary packages in the template, which could potentially be executed if the AppVM gets compromised. Of course more software pre-installed means more storage, CPU and RAM usage, this is especially noticable when using many VMs.
There are [template VMs of the minimal OS packages](https://www.qubes-os.org/doc/templates/minimal/), where only the essential programs are pre-installed. This reduces potential security vulnerabilities and resource requirements. There are minimal templates available for Fedora, Debian, CentOS and Gentoo [not for Whonix].
They can be installed by executing in dom0 `sudo qubes-dom0-update qubes-template-<DISTRO_NAME>-<RELEASE_NUMBER>-minimal`. Some newer versions may not be available in the "official" repository, so add the flag `--enablerepo=qubes-templates-itl-testing` or `--enablerepo=qubes-templates-community`. Now install only the software which you want to run.

## App VMs

The software you engage with should mostly be booted in app VMs.
These are VMs which are based on template VMs, so any software that is installed in the template VM, can be run in the app VM.
You should not install new software in app VMs, in fact, any software that is installed in app VMs will be deleted on shutdown.
However, this can be useful if you want to test software without committing to installing it long term.
For example, if you want to have a dedicated app VM to access a browser, or any other standard software, then you can use the regular Debian, or Fedora, or Whonix template VMs.
But, if you want an app VM to run custom software, then base it on a template VM where you have installed this.
You can create multiple app VMs on the same template, and store different data on them, which is useful to separate for example your mainnet and testnet Bitcoin wallet.
Create app VMs by executing in dom0: `qvm-create <name of app VM> --template <name of template VM> --label <color>`.

Qubes is made to compartimentalize your computer, and it has it's greatest potential, when this concept is applied to the extreme.
Each software should have it's own dedicated VM.
Even further, some website should have dedicated VMs too!
This is not just a security improvement, but also [an incredible productivity hack](https://github.com/Kixunil/security_writings/blob/master/solving_security_and_procrastination.md).
When for example GitHub and Twitter can only be accessed in two independent VMs, then the incentive to waste time on Twitter is drastically reduced.

## Disposable VMs

Disposable VMs are a special type of VM which clone an already existing app VM, boot it to run software, and upon shutdown, delete the entire VM.
This is especially useful for security and privacy focused tasks, where unnecessary metadata should be avoided.
For example, booting a disposable Whonix VM to access the Tor browser, and after use deleting all possible metadata and logs.
Any VM can be made a template for disp VMs by executing in dom0: `qvm-prefs --set <name of VM> template_for_dispvms True`.
Now any software that is installed in this VM can be booted in a disposable environment by executing in dom0: `qvm-run --dispvm=<name of disp VM template> <software to execute>`.
After the software is shut down, the dispvm is destroyed.

There are some important things to consider when using Whonix in disposable VMs, so please carefully [read the docs on how to set it up properly](https://whonix.org/wiki/Qubes/DisposableVM).

## Alias' in dom0

As you can see by the command examples above, running a software in a VM can become a bit tedious.
A great productivity hack is to maintain an exhaustive collection of alias' in dom0.
These can be added at the end of the `~/.bashrc` file in dom0.
For example, launching a dedicated software in a dedicated VM becomes as easy as executing in dom0 `sgnl`, which is the alias for `alias sgnl='qvm-run signal signal-desktop'`.
Or, booting a disposable Whonix VM and running the Tor browser and fetching a dedicated .onion website is as easy as `explr`, due to `alias explr='qvm-run --dispvm=whonix-ws-dvm "torbrowser http://explorerzydxu5ecjrkwceayqybizmpjjznk5izmitf2modhcusuqlid.onion"'.
To shutdown a VM is as simple as `kgh`, due to `alias kgh='qvm-shutdown github'`.

Another nice trick is to use more ellaborate bash scripts to handle more complex tasks.
These can be added in dom0 to `~/usr/local/bin/`, and made executable with `sudo chmod +x`.
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

## i3 window manager

Qubes comes with a very well configured custom build of the [i3 window manager](https://i3wm.org), and it is a match made for the gods.
The installation is trivial, by simply executing in dom0: `sudo qvm-dom0-update i3 i3-settings-qubes`.
Next time when logging in with username and password, click on the `XF` circle in the top right corner, and select `i3 wm`. 
The experience is almost identical to the regular i3wm setup, however, each VM will have it's own color scheme around the borders of the i3 window.
The d-menu navigation [mod + d] has a list of the favorite applications, starting with the name of the VM, following with the software itself, but because of the use of dom0 alias', this is not often used.

One increadible useful combination of i3 + Qubes is the function of the scratchpad.
This is a window that is usally hidden, though any application can be put into this window, and on demand, it is revelaed on whatever workscreen the current view is.
This is especially useful when a dom0 terminal is in the scratchpad, from which the alias' can be called.
In the `~/.config/i3/config` file, add two lines `bindsym $mod+SHIFT+o move scratchpad` to move any window into the scratchpad, and `bindsym $mod+o scratchpad show` to show the window.just
On an empty workspace, open a dom0 terminal [mod + ENTER], then move it to the scratchpad [mod + SHIFT + o].
Now, on whatever workscreen you are, reveal the scratchpad [mod + o], execute a dom0 command, and hide the scratchpad again [mod + o]. 
 
## Conclusion

Running Qubes is like buying a new computer for every task, and throwing it away after it is done.
Like any advanced cyberspace tool, it has a learning curve, but it is absolutely doable for anyone with the motivation to defend his security and privacy.
Once the fundamental concept of radical compartmentalization is understood, when template, app and disp VMs are setup properly, and when alias' are included, then it becomes very user friendly too.
At this point, you will understand that Qubes is actually **the only reasonably secure operating system** out there.
