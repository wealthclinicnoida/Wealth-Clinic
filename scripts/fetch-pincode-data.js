'use strict';

// Usage: node scripts/fetch-pincode-data.js
// Scans India Post pincode ranges for the target cities and writes scripts/data/pincodes.json

const fs = require('fs');
const path = require('path');

const RANGES = [
  [110001, 110099],
  [122001, 122110],
  [201001, 201320],
  [203201, 203210],
  [224001, 224240],
  [226001, 226405],
  [227101, 227110],
  [244001, 244110],
  [244401, 244420],
  [244601, 244605],
];

const OFFICE_TYPE = {
  'Head Post Office': 'Head Office',
  'Sub Post Office': 'Sub Office',
  'Branch Post Office': 'Branch Office',
};

function cityFor(pin, po) {
  const state = po.State;
  const district = (po.District || '').toLowerCase();
  if (state === 'Delhi') return 'Delhi';
  if (district.includes('gautam')) {
    if (['201306', '201308', '201310'].includes(pin)) return 'Greater Noida';
    if (pin.startsWith('2032')) return 'Yamuna Expressway';
    return 'Noida';
  }
  if (district.includes('ghaziabad')) return 'Ghaziabad';
  if (district.includes('gurgaon') || district.includes('gurugram')) return 'Gurugram';
  if (district.includes('lucknow')) return 'Lucknow';
  if (district.includes('moradabad')) return 'Moradabad';
  if (district.includes('ayodhya') || district.includes('faizabad')) return 'Ayodhya';
  return null;
}

const clean = (n) => n.replace(/\s*\((?:[^)]*)\)\s*$/, '').trim();

async function lookup(pin, attempt = 0) {
  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
    const json = await res.json();
    return json[0].Status === 'Success' ? json[0].PostOffice : [];
  } catch (e) {
    if (attempt < 3) {
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
      return lookup(pin, attempt + 1);
    }
    console.error(`failed ${pin}: ${e.message}`);
    return [];
  }
}

async function main() {
  const pins = [];
  for (const [a, b] of RANGES) for (let p = a; p <= b; p++) pins.push(String(p));

  const results = [];
  let i = 0;
  async function worker() {
    while (i < pins.length) {
      const pin = pins[i++];
      const offices = await lookup(pin);
      if (!offices.length) continue;
      const city = cityFor(pin, offices[0]);
      if (!city) continue;
      const rank = { 'Head Post Office': 0, 'Sub Post Office': 1, 'Branch Post Office': 2 };
      const primary = [...offices].sort((x, y) => (rank[x.BranchType] ?? 3) - (rank[y.BranchType] ?? 3))[0];
      results.push({
        pincode: pin,
        state: primary.State,
        city,
        area: clean(primary.Name),
        postOffice: clean(primary.Name),
        postOfficeType: OFFICE_TYPE[primary.BranchType] || null,
        allOffices: offices.map((o) => clean(o.Name)),
      });
    }
  }
  await Promise.all(Array.from({ length: 6 }, worker));

  results.sort((a, b) => a.pincode.localeCompare(b.pincode));
  const out = path.join(__dirname, 'data', 'pincodes.json');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(results, null, 2));

  const byCity = {};
  results.forEach((r) => (byCity[r.city] = (byCity[r.city] || 0) + 1));
  console.log(`scanned ${pins.length}, kept ${results.length}`, byCity);
}

main();
