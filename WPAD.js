// WPAD Elite Autoconfig script by Notorious Pyro (Craig Crawford)
// https://PyroNexus.com/go/wpad-elite
// Version 1.1.1
// License: Creative Commons Attribution-ShareAlike 4.0 International [CC BY-SA 4.0]
// https://creativecommons.org/licenses/by-sa/4.0/

function FindProxyForURL(url, host) {
	// Your network (e.g. 192.168.1.0)
	// Your subnet (e.g. 255.255.255.0).
	// Clients will not connect via the proxy for servers in this network range.
	var network = "10.8.0.0";
	var subnet = "255.255.252.0";

	// Proxy name specifications. Add as many as you want to suit your set up and then specify how to handle them below.
	// Syntax:
	// var myproxy1 = "PROXY proxy.myproxy.com:8888;";
	// var myproxy2 = "PROXY proxy2.myproxy.com:8888;";
	// var loadbalance = myproxy1 + myproxy2;
	var proxy1 = "PROXY proxy1.pyronexus.lan:3128;";
	var proxy2 = "PROXY proxy2.pyronexus.lan:3128;";
	var proxy_on = proxy1 + proxy2;
	var proxy_off = "DIRECT";
	var proxy_default = proxy_on;

	var url_filter = {
		// URL-based filtering. Done first before Hostname-based filtering below.
		// This can be used to send certain pages through a different proxy than ones defined lower than it or in hostname-based filtering.
		//
		// Examples:
		// "Unique User-friendly name1": {
		//		matchurl: "*microsoft.com/some/sub/url/*",
		//		proxy: proxy_on
		//	},
		"Channel 4 Live": {
			matchurl: "*channel4.com/now*",
			proxy: proxy_on
		}
	}

	var host_filter = {
		// Hostname-based filtering
		//
		// Examples:
		// Single domain, no subdomains:
		// "Unique User-friendly name2": {
		//		matchhosts: new Array("alpha.website.com"),
		//		matchsubdomains: false,
		//		proxy: proxy_on
		//	},
		// Multi domain, all subdomains:
		// "Unique User-friendly name3": {
		//		matchhosts: new Array(
		//			"alpha.website.com",
		//			"beta.homepage.com",
		//			"delta.mysite.co.uk"
		//		),
		//		matchsubdomains: true,
		//		proxy: proxy_off
		//	},

		// Do not allow localhost to proxy.
		"Localhost": {
			matchhosts: new Array(
				"localhost",
				"local"
			),
			matchsubdomains: true,
			proxy: proxy_off
		},
		// PyroNexus sites and domains...
		"PyroNexus": {
			matchhosts: new Array(
				"pyronexus.lan",
				"pyronexus.com",
				"3da.k.hostens.cloud"
			),
			matchsubdomains: true,
			proxy: proxy_off
		},

		// Video sites
		// Including: YouTube, Amazon, Channel 4
		"Video": {
			matchhosts: new Array(
				"youtube.com",
				"amazon.com",
				"amazon.co.uk",
				"channel4.com",
				"c4assets.com"
			),
			matchsubdomains: true,
			proxy: proxy_off
		},
		// Banks
		// Including: TSB, Bank of Scotland, Barclays, Halifax, RBS, NatWest, Clydesdale Bank
		"Banks": {
			matchhosts: new Array(
				"tsb.co.uk",
				"bankofscotland.co.uk",
				"barclays.co.uk",
				"halifax.co.uk",
				"rbs.co.uk",
				"natwest.com",
				"cbonline.co.uk"
			),
			matchsubdomains: true,
			proxy: proxy_off
		},

		// IPv6 Test as my VPN has IPv6 disabled.
		"IPv6 Test": {
			matchhosts: new Array("ipv6-test.com"),
			matchsubdomains: true,
			proxy: proxy_off
		},

		// Samsung blocks certain VPNs it seems...
		"Samsung": {
			matchhosts: new Array("samsung.com"),
			matchsubdomains: true,
			proxy: proxy_off
		}
	}

	// Below here is the logic for the above. It is more complex than the above so you are more likely to break the script.
	// Edit only if you feel confident.

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
				if ((shExpMatch(host, object.matchhosts[i])) || (object.matchsubdomains === true && shExpMatch(host, "*." + object.matchhosts[i]))) {
					return object.proxy;
				}
			}
		}

		// Default to routing through proxy if no filters allow direct connections to the site.
		return proxy_default;
	} else {
		// Everything non-HTTP/HTTPS/FTP is sent directly.
		return proxy_off;
	}
}