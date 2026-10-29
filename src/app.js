import { SCENARIOS, classify } from "./classify.js";

const scenario = document.querySelector("#scenario");
const summary = document.querySelector("#summary");
const views = { ipv4: document.querySelector("#ipv4"), ipv6: document.querySelector("#ipv6") };

function showObservation(element, observation) {
  element.replaceChildren();
  const rows = observation.ok
    ? [["Address", observation.address], ["Network", observation.network], ["Country code", observation.country]]
    : [["Status", "Unavailable in this sample"]];
  for (const [label, value] of rows) {
    const term = document.createElement("dt");
    const detail = document.createElement("dd");
    term.textContent = label;
    detail.textContent = value;
    element.append(term, detail);
  }
}

function compare() {
  const sample = SCENARIOS[scenario.value];
  if (!sample) return;
  const result = classify(sample.ipv4, sample.ipv6);
  summary.textContent = `${result.title}. ${result.detail}`;
  summary.dataset.level = result.level;
  showObservation(views.ipv4, sample.ipv4);
  showObservation(views.ipv6, sample.ipv6);
}

document.querySelector("#compare").addEventListener("click", compare);
compare();
