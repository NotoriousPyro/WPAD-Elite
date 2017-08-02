WPAD Elite Autoconfig script by Notorious Pyro (Craig Crawford)
https://PyroNexus.com/go/wpad-elite
Version 1.3.0
License: Creative Commons Attribution-ShareAlike 4.0 International [CC BY-SA 4.0]
https://creativecommons.org/licenses/by-sa/4.0/

Description:
Allows for easy and powerful WPAD autoconfiguration. Less repetitive, easier to read. Object-oriented. Suggestions welcome.
Once a "match" is found, the script returns the proxy address and halts execution. That means that the higher up a rule is, the
more likely it is the active rule. This allows for overriding of further down blocks.

Simply edit the file and add to your working WPAD web server. It should be noted that the higher a rule is, the higher the precedence,
so IP-based filtering comes first, then URL-based filtering, and then Hostname-based filtering. Each rule is also ordered the same,
so the higher a rule is in url_filter, the more precedence it has of ones beneath it.

Requirements:
A webserver configured for WPAD, nginx works well (see: https://pyronexus.com/2017/01/16/wpad-proxy-auto-configuration-with-nginx/)
A proxy server, DNS server and appropriate DNS entries (wpad.yourdomain.com).

Debugging:
Debug using autoprox at http://blogs.msdn.com/cfs-file.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-01-14-81/4628.autoprox.zip
Use Chrome internals chrome://net-internals/#sockets and chrome://net-internals/#proxy