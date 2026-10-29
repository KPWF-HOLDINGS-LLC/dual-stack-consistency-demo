# Dual Stack Consistency Demo

A static browser demonstration of how IPv4 and IPv6 observations can be compared. It runs entirely on synthetic data and makes no network requests. The page has no token, external link, site integration, or production route.

From this directory, run `python3 -m http.server --bind 127.0.0.1 8766`, then open `http://127.0.0.1:8766` in a browser and select a scenario. Run `node --test` with Node.js 18 or newer to check the classification logic.

The five scenarios cover matching network labels, a missing address family, mixed network labels, differing signals, and no observations. The result is descriptive, not a privacy or security verdict. A live version would need a separately reviewed server-side collection design and clear consent.
