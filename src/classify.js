export const SCENARIOS = Object.freeze({
  same: {
    ipv4: { ok: true, address: "192.0.2.10", network: "Example network A", country: "ZZ" },
    ipv6: { ok: true, address: "2001:db8::10", network: "Example network A", country: "ZZ" }
  },
  ipv6_missing: {
    ipv4: { ok: true, address: "192.0.2.10", network: "Example network A", country: "ZZ" },
    ipv6: { ok: false }
  },
  mixed: {
    ipv4: { ok: true, address: "192.0.2.10", network: "Example network A", country: "ZZ" },
    ipv6: { ok: true, address: "2001:db8::20", network: "Example network B", country: "ZZ" }
  },
  different: {
    ipv4: { ok: true, address: "192.0.2.10", network: "Example network A", country: "ZZ" },
    ipv6: { ok: true, address: "2001:db8::30", network: "Example network C", country: "YY" }
  },
  unavailable: { ipv4: { ok: false }, ipv6: { ok: false } }
});

function sameText(left, right) {
  return typeof left === "string" && typeof right === "string" &&
    left.trim().toLowerCase() === right.trim().toLowerCase() && left.trim() !== "";
}

export function classify(ipv4, ipv6) {
  if (ipv4.ok && ipv6.ok && sameText(ipv4.network, ipv6.network)) {
    return { level: "normal", title: "Matching network signals", detail: "Both address families are visible in the same example network." };
  }
  if (ipv4.ok && !ipv6.ok) {
    return { level: "attention", title: "IPv6 unavailable", detail: "Only the IPv4 observation is present in this sample." };
  }
  if (!ipv4.ok && ipv6.ok) {
    return { level: "attention", title: "IPv4 unavailable", detail: "Only the IPv6 observation is present in this sample." };
  }
  if (ipv4.ok && ipv6.ok && sameText(ipv4.country, ipv6.country)) {
    return { level: "attention", title: "Mixed network signals", detail: "Both families are present, but the example network labels differ." };
  }
  if (ipv4.ok && ipv6.ok) {
    return { level: "attention", title: "Different network signals", detail: "The example network and country labels differ." };
  }
  return { level: "unavailable", title: "No observations", detail: "Neither address family has a sample observation." };
}
