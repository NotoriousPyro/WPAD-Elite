// WPAD Elite Autoconfig script by Notorious Pyro (Craig Crawford)
// https://PyroNexus.com/go/wpad-elite
// Version 1.0
// License: Creative Commons Attribution-ShareAlike 4.0 International [CC BY-SA 4.0]
// https://creativecommons.org/licenses/by-sa/4.0/
// 
// Description:
// Allows for easy and powerful WPAD autoconfiguration. Less repetitive, easier to read. Suggestions welcome.
//
// Requirements:
// A webserver configured for wpad, nginx works well (see: https://pyronexus.com/2017/01/16/wpad-proxy-auto-configuration-with-nginx/)
// A proxy server, DNS server and appropriate DNS entries (wpad.yourdomain.com).
//
// Debugging:
// Debug using autoprox at http://blogs.msdn.com/cfs-file.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-01-14-81/4628.autoprox.zip
// Use Chrome internals chrome://net-internals/#sockets and chrome://net-internals/#proxy

function FindProxyForURL(url, host) {
	// Load balancing between proxies
	var proxy_on = "PROXY proxy1.pyronexus.lan:3128; PROXY proxy2.pyronexus.lan:3128";
	var proxy_off = "DIRECT";
	// Your network (e.g. 192.168.1.0)
	var network = "10.8.0.0";
	// Your subnet (e.g. 255.255.255.0).
	var subnet = "255.255.252.0";

	// URL-based filtering. Done first before Hostname-based filtering below.
	var url_filter = {
		"Channel 4 Live": {
			matchurl: "*://*channel4.com/now*",
			proxy: proxy_on
		}
	}

	// Hostname-based filtering
	var host_filter = {
		// Do not allow localhost to proxy.
		"Localhost": {
			matchhosts: new Array("localhost", "*.localhost","local", "*.local"),
			proxy: proxy_off
		},
		// PyroNexus sites and domains...
		"PyroNexus": {
			matchhosts: new Array("pyronexus.lan", ".pyronexus.lan", "pyronexus.com", "*.pyronexus.com", "3da.k.hostens.cloud", "*.3da.k.hostens.cloud"),
			proxy: proxy_off
		},

		// Video sites
		// Including: YouTube, Amazon, Channel 4
		"Video": {
			matchhosts: new Array("youtube.com", "*.youtube.com", "amazon.com", "*.amazon.com", "amazon.co.uk", "*.amazon.co.uk",
				"channel4.com", "*.channel4.com", "c4assets.com", "*.c4assets.com"),
			proxy: proxy_off
		},
		// Banks
		// Including: TSB, Bank of Scotland, Barclays, Halifax, RBS, NatWest, Clydesdale Bank
		"Banks": {
			matchhosts: new Array("tsb.co.uk", "*.tsb.co.uk", "bankofscotland.co.uk", "*.bankofscotland.co.uk", "barclays.co.uk", "*.barclays.co.uk",
				"halifax.co.uk", "*.halifax.co.uk", "rbs.co.uk", "*.rbs.co.uk", "natwest.com", "*.natwest.com", "cbonline.co.uk", "*.cbonline.co.uk"),
			proxy: proxy_off
		},

		// IPv6 Test as my VPN has IPv6 disabled.
		"IPv6 Test": {
			matchost: new Array("ipv6-test.com", "*.ipv6-test.com"),
			proxy: proxy_off
		},

		// Samsung blocks certain VPNs it seems...
		"Samsung": {
			matchhosts: new Array("samsung.com", "*.samsung.com"),
			proxy: proxy_off
		}
	}

	// Below here evaluates the above.
	// Edit at your own risk.

	// Check if HTTP, HTTPS or FTP. If not, send direct.
	if (shExpMatch(url, "http:*") || shExpMatch(url, "https:*") || shExpMatch(url, "ftp:*")) {

		// Bypass proxy for local web servers in the same subnet as the client.
		if (isInNet(host, network, subnet)) {
			return proxy_off;
		}

		// URL Filtering
		for (var item in url_filter) {
			var object = url_filter[item];
			if (shExpMatch(url, object.matchurl)) {
				return object.proxy;
			}
		}

		// Host Filtering
		for (var item in host_filter) {
			var object = host_filter[item];
			for (var i = 0; i < object.matchhosts.length; i++) {
				if (shExpMatch(host, object.matchhosts[i])) {
					return object.proxy;
				}
			}
		}

		return proxy_on;
	} else {
		return proxy_off;
	}
}