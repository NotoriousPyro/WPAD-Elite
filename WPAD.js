// WPAD Elite Autoconfig script by Notorious Pyro (Craig Crawford)
// https://PyroNexus.com/go/wpad-elite
// Version 1.3.0
// License: Creative Commons Attribution-ShareAlike 4.0 International [CC BY-SA 4.0]
// https://creativecommons.org/licenses/by-sa/4.0/

function FindProxyForURL(url, host) {
	// Proxy name specifications. Add as many as you want to suit your set up and then specify how to handle them below.
	// Syntax:
	// var myproxy1 = "PROXY proxy.myproxy.com:8888;";
	// var myproxy2 = "PROXY proxy2.myproxy.com:8888;";
	// var loadbalance = myproxy1 + myproxy2;
	var proxy1 = "PROXY proxy1.pyronexus.lan:3128;";
	var proxy2 = "PROXY proxy2.pyronexus.lan:3128;";
	var proxy3 = "PROXY proxy3.vpn.pyronexus.lan:3128;";
	var proxy4 = "PROXY proxy4.vpn.pyronexus.lan:3128;";
	var proxy_on = proxy1 + proxy2;
	var proxy_off = "DIRECT";
	var proxy_default = proxy_on;

	var ip_filter_enabled = true;
	var ip_filter = {
		//	IP-based filtering. Done before any other filtering.
		//	
		//	Examples:
		//		Matches the commonly-used RFC1918 address range 192.168.1.0/24.
		//			"Class C": {
		//				match_ip_network: "192.168.1.0",
		//				match_ip_subnet: "255.255.255.0",
		//				proxy: proxy_off
		//			}
		"PyroNexus LAN/VPN": {
			match_ip_network: "10.8.0.0",
			match_ip_subnet: "255.255.252.0",
			proxy: proxy_off
		}
	}

	var url_filter_enabled = false;
	var url_filter = {
		//	URL-based filtering. Done first before Hostname-based filtering below.
		//	
		//	Examples:
		//		Matches *microsoft.com/some/sub/url/*, using * as wildcard, such as microsoft.com/some/sub/url/windows.html
		//			"Unique identifier #1": {
		//				match_url: "*microsoft.com/some/sub/url/*",
		//				proxy: proxy_on
		//			},
		"Channel 4 Live": {
			match_url: "*channel4.com/now*",
			proxy: proxy_on
		}
	}

	var host_filter_enabled = true;
	var host_filter = {
		//	Hostname-based filtering
		//	
		//	Examples:
		//		Single domain, no subdomains
		//		Matches ONLY alpha.website.com and not a.alpha.website.com or website.com
		//			"Unique identifier #2": {
		//				match_hosts: new Array("alpha.website.com"),
		//				match_subdomains: false,
		//				proxy: proxy_on
		//			},
		//
		//		Multi domain, all subdomains
		//		Matches alpha.website.com, beta.homepage.com and delta.mysite.co.uk, AND their subdomains.
		//			"Unique identifier #3": {
		//				match_hosts: new Array(
		//					"alpha.website.com",
		//					"beta.homepage.com",
		//					"delta.mysite.co.uk"
		//				),
		//				match_subdomains: true,
		//				proxy: proxy_off
		//			},

		// Do not allow localhost to proxy.
		"Localhost": {
			match_hosts: new Array(
				"localhost",
				"local"
			),
			match_subdomains: true,
			proxy: proxy_off
		},

		// PyroNexus sites and domains...
		"PyroNexus": {
			match_hosts: new Array(
				"pyronexus.lan",
				"pyronexus.com"
			),
			match_subdomains: true,
			proxy: proxy_off
		},

		// Video sites
		// Including: YouTube, Amazon
		"Video": {
			match_hosts: new Array(
				"youtube.com",
				"amazon.com",
				"amazon.co.uk"
			),
			match_subdomains: true,
			proxy: proxy_off
		},

		// BBC
		"BBC": {
			match_hosts: new Array(
				"bbciplayer.co.uk",
				"bbci.co.uk",
				"bbc.co.uk",
				"bbc.net.uk",
				"bbc.map.fastly.net",
				"e3891.g.akamaiedge.net",
				"bbc01.sitestat.com",
				"bbci.co.uk.edgekey.net"
			),
			match_subdomains: true,
			proxy: proxy4
		},

		// Channel 4
		"Channel 4": {
			match_hosts: new Array(
				"channel4.com",
				"c4assets.com"
			),
			match_subdomains: true,
			proxy: proxy4
		},

		// Banks
		// Including: TSB, Bank of Scotland, Barclays, Halifax, RBS, NatWest, Clydesdale Bank
		"Banks": {
			match_hosts: new Array(
				"tsb.co.uk",
				"bankofscotland.co.uk",
				"barclays.co.uk",
				"halifax.co.uk",
				"rbs.co.uk",
				"natwest.com",
				"cbonline.co.uk",
				"skipton.co.uk"
			),
			match_subdomains: true,
			proxy: proxy_off
		},

		// Steam
		"Steam": {
			match_hosts: new Array(
				"steampowered.com",
				"steamcommunity.com"
			),
			match_subdomains: true,
			proxy: proxy_off
		},

		// IPv6 Test as my VPN has IPv6 disabled.
		"IPv6 Test": {
			match_hosts: new Array("ipv6-test.com"),
			match_subdomains: true,
			proxy: proxy_off
		},

		// "Access Denied" web pages which hate my VPN.
		"Access Denied": {
			match_hosts: new Array(
				"samsung.com",
				"expedia.co.uk"
			),
			match_subdomains: true,
			proxy: proxy_off
		}
	}

	// Below here is the logic for the above. It is more complex than the above so you are more likely to break the script.
	// Edit only if you feel confident.

	// Check if HTTP, HTTPS or FTP. If not, send direct.
	if (shExpMatch(url, "http:*") || shExpMatch(url, "https:*") || shExpMatch(url, "ftp:*")) {
		// IP Filtering
		if (ip_filter_enabled === true) {
			for (var item in ip_filter) {
				var object = ip_filter[item];
				if (isInNet(host, object.match_ip_network, object.match_ip_subnet)) {
					return object.proxy;
				}
			}
		}

		// URL Filtering
		if (url_filter_enabled === true) {
			for (var item in url_filter) {
				var object = url_filter[item];
				if (shExpMatch(url, object.match_url)) {
					return object.proxy;
				}
			}
		}

		// Host Filtering
		if (host_filter_enabled === true) {
			for (var item in host_filter) {
				var object = host_filter[item];
				for (var i = 0; i < object.match_hosts.length; i++) {
					if ((shExpMatch(host, object.match_hosts[i])) || (object.match_subdomains === true && shExpMatch(host, "*." + object.match_hosts[i]))) {
						return object.proxy;
					}
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