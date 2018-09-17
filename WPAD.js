// WPAD Elite Autoconfig script by NotoriousPyro (Craig Crawford)
// https://PyroNexus.com/go/wpad-elite
// Version 3.0.0
// License: Creative Commons Attribution-ShareAlike 4.0 International [CC BY-SA 4.0]
// https://creativecommons.org/licenses/by-sa/4.0/
//
//	Common to all of the filter configuration blocks are:
//		proxy: proxyName
//		- This allows you to use the name you specified at the top
//
//		enabled: true
//		- This is by default true when undefined (not specified) or anything other than exactly: false

function FindProxyForURL(url, host) {
	// Proxy name specifications. Add as many as you want to suit your set up and then specify how to handle them below.
	// Syntax:
	// let myproxy1 = "PROXY proxy.myproxy.com:8888;";
	// let myproxy2 = "PROXY proxy2.myproxy.com:8888;";
	// let loadbalance = myproxy1 + myproxy2;
	let proxy1 = "PROXY proxy1.pyronexus.lan:3128;";
	let proxy2 = "PROXY proxy2.pyronexus.lan:3128;";
	let proxy3 = "PROXY proxy3.vpn.pyronexus.lan:3128;";
	let proxy4 = "PROXY proxy4.vpn.pyronexus.lan:3128;";
	let proxy_on = proxy1 + proxy2;
	let proxy_off = "DIRECT";
	let proxy_default = proxy_on;

	let urlFilter = {
		enabled: false,
		//	URL-based filtering. Very specific and done first. Useful for example, if you have a rule for microsoft.com
		//	set up, and you want a specific URL such as microsoft.com/some/url, to be sent through a different proxy
		//	or directly.
		//
		//	Syntax:
		//		"Unique Name #1": {
		//			url: "*myUrl.com/someSubFolder/*",
		//			proxy: proxyName
		//		},
		//
		"Channel 4 Live": {
			matchUrl: "*channel4.com/now*",
			proxy: proxy_on
		},
	};

	let ipFilter = {
		enabled: true,
		//	IP-based filtering. Done after URL-based filtering.
		//	
		//	Syntax:
		//		"Unique Name #2": {
		//			enabled: false,
		//			matchNetwork: "192.168.1.0",
		//			matchSubnet: "255.255.255.0",
		//			proxy: proxyName
		//		},
		//
		"Localhost": {
			matchNetwork: "127.0.0.1",
			matchSubnet: "255.255.255.0",
			proxy: proxy_off
		},

		"PyroNexus LAN/VPN": {
			matchNetwork: "10.8.0.0",
			matchSubnet: "255.255.252.0",
			proxy: proxy_off
		},
	};

	let hostFilter = {
		enabled: true,
		//	Hostname-based filtering. Done last.
		//	
		//	Syntax:
		//		Single domain, no subdomains
		//		Matches ONLY alpha.website.com and not a.alpha.website.com or website.com
		//			"Unique identifier #2": {
		//				enabled: false,
		//				matchHosts: [
		//					"alpha.website.com"
		//				],
		//				matchSubdomains: false,
		//				proxy: proxy_on
		//			},
		//
		//		Multi domain, all subdomains
		//		Matches alpha.website.com, beta.homepage.com and delta.mysite.co.uk, AND their subdomains.
		//			"Unique identifier #3": {
		//				matchHosts: [
		//					"alpha.website.com",
		//					"beta.homepage.com",
		//					"delta.mysite.co.uk"
		//				],
		//				matchSubdomains: true,
		//				proxy: proxy_off
		//			},

		// Do not allow localhost to proxy.
		"Localhost": {
			matchHosts: [
				"localhost",
				"local"
			],
			matchSubdomains: true,
			proxy: proxy_off
		},

		// PyroNexus sites and domains...
		"PyroNexus": {
			matchHosts: [
				"pyronexus.lan",
				"pyronexus.com",
				"metaverse.farm",
				"mvs.farm"
			],
			matchSubdomains: true,
			proxy: proxy_off
		},

		// Including: YouTube, Amazon
		"Video": {
			matchHosts: [
				"youtube.com",
				"amazon.com",
				"amazon.co.uk",
				"netflix.com"
			],
			matchSubdomains: true,
			proxy: proxy_off
		},

		"BBC": {
			matchHosts: [
				"bbciplayer.co.uk",
				"bbci.co.uk",
				"bbc.co.uk",
				"bbc.net.uk",
				"bbc.map.fastly.net",
				"e3891.g.akamaiedge.net",
				"bbc01.sitestat.com",
				"bbci.co.uk.edgekey.net"
			],
			matchSubdomains: true,
			proxy: proxy4
		},

		"Channel 4": {
			matchHosts: [
				"channel4.com",
				"c4assets.com"
			],
			matchSubdomains: true,
			proxy: proxy4
		},

		// Including: TSB, Bank of Scotland, Barclays, Halifax, RBS, NatWest, Clydesdale Bank
		"Banks": {
			matchHosts: [
				"tsb.co.uk",
				"bankofscotland.co.uk",
				"barclays.co.uk",
				"halifax.co.uk",
				"rbs.co.uk",
				"natwest.com",
				"cbonline.co.uk",
				"skipton.co.uk"
			],
			matchSubdomains: true,
			proxy: proxy_off
		},

		"Cryptocurrencies": {
			matchHosts: [
				"bittrex.com",
				"bitfinex.com",
				"ethfinex.com",
				"gdax.com",
				"coinbase.com",
				"ethereum.org",
				"binance.com"
			],
			matchSubdomains: true,
			proxy: proxy_off
		},

		// Steam
		"Steam": {
			matchHosts: [
				"steampowered.com",
				"steamcommunity.com"
			],
			matchSubdomains: true,
			proxy: proxy_off
		},

		// IPv6 Test as my VPN has IPv6 disabled.
		"IPv6 Test": {
			matchHosts: [
				"ipv6-test.com"
			],
			matchSubdomains: true,
			proxy: proxy_off
		},

		// Microsoft
		"Microsoft": {
			matchHosts: [
				"microsoft.com",
				"skype.com"
			],
			matchSubdomains: true,
			proxy: proxy_off
		},

		// "Access Denied" web pages which hate my VPN.
		"Access Denied": {
			matchHosts: [
				"samsung.com",
				"expedia.co.uk",
				"dorothyperkins.com",
				"gumtree.com",
				"prometeus.net",
				"burton.co.uk",
				"analytics.google.com",
				"netflix.com",
				"nflxvideo.net",
				"cmegroup.com"
			],
			matchSubdomains: true,
			proxy: proxy_off
		}
	};

	// Below here is the logic for the above. It is more complex than the above so you are more likely to break the script.
	// Edit only if you feel confident.

	let enabled = function (object) {
		return (typeof object === "undefined" || object !== false)
	}

	// Check if HTTP, HTTPS or FTP. If not, send direct.
	if ((shExpMatch(url, "http:*") || shExpMatch(url, "https:*") || shExpMatch(url, "ftp:*")) && !isPlainHostName(host)) {

		// URL Filtering
		if (enabled(urlFilter.enabled)) {

			for (let item in urlFilter) {
				let object = urlFilter[item];

				if (typeof object !== "boolean" && enabled(object)) {

					if (shExpMatch(url, object.matchUrl)) {
						return object.proxy;
					}

				}

			}

		}

		// IP Filtering
		if (enabled(ipFilter.enabled)) {

			for (let item in ipFilter) {

				let object = ipFilter[item];

				if (typeof object !== "boolean" && enabled(object)) {

					if (isInNet(host, object.matchNetwork, object.matchSubnet)) {
						return object.proxy;
					}

				}

			}

		}

		// Host Filtering
		if (enabled(hostFilter.enabled)) {
			for (let item in hostFilter) {

				let object = hostFilter[item];

				if (typeof object !== "boolean" && enabled(object)) {

					for (let hostname of object.matchHosts) {

						if (shExpMatch(host, hostname) || (object.matchSubdomains === true && shExpMatch(host, "*." + hostname))) {
							return object.proxy;
						}

					}

				}

			}

		}

		// Default to routing through proxy if no filters allow direct connections to the site.
		return proxy_default;
	}
	// Everything non-HTTP/HTTPS/FTP is sent directly.
	return proxy_off;
}
