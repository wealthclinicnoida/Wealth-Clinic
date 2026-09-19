'use strict';

// Usage: node scripts/import-pincodes.js [baseUrl]
// Imports scripts/data/pincodes.json via the REST API. Reuses existing City/Area by name,
// creates missing Areas, skips pincodes that already exist. Optional STRAPI_TOKEN env var.

const data = require('./data/pincodes.json');

const BASE = (process.argv[2] || 'https://bold-approval-c005df0fb8.strapiapp.com').replace(/\/$/, '') + '/api';
const headers = { 'Content-Type': 'application/json' };
if (process.env.STRAPI_TOKEN) headers.Authorization = `Bearer ${process.env.STRAPI_TOKEN}`;

const slugify = (v) =>
  String(v).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const norm = (v) => String(v).trim().toLowerCase();

async function api(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, { headers, ...options });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(`${options.method || 'GET'} ${path} -> ${res.status} ${json?.error?.message || ''}`);
    err.status = res.status;
    throw err;
  }
  return json;
}

async function fetchAll(path, fieldsQuery) {
  const out = [];
  for (let page = 1; ; page++) {
    const j = await api(`${path}?${fieldsQuery}&pagination[page]=${page}&pagination[pageSize]=100`);
    out.push(...j.data);
    if (page >= j.meta.pagination.pageCount) break;
  }
  return out;
}

const faqs = (r) => [
  { question: `What is the pincode of ${r.area}, ${r.city}?`, answer: `The pincode of ${r.area}, ${r.city} is ${r.pincode}.` },
  { question: `Which state is ${r.area} located in?`, answer: `${r.area}, ${r.city} is located in ${r.state}.` },
  { question: `What is the post office for pincode ${r.pincode}?`, answer: `The post office associated with pincode ${r.pincode} is ${r.postOffice}.` },
];

async function main() {
  const cities = new Map(
    (await fetchAll('/create-cities', 'fields[0]=City_Name')).map((c) => [norm(c.attributes.City_Name), c.id])
  );
  const areas = new Map(
    (await fetchAll('/areas', 'fields[0]=name')).map((a) => [norm(a.attributes.name), a.id])
  );
  const existing = new Set(
    (await fetchAll('/pincodes', 'fields[0]=pincode')).map((p) => p.attributes.pincode)
  );

  let created = 0, skipped = 0, failed = 0, newAreas = 0;
  for (const r of data) {
    if (existing.has(r.pincode)) { skipped++; continue; }
    const cityId = cities.get(norm(r.city));
    if (!cityId) { console.error(`no city "${r.city}" for ${r.pincode}`); failed++; continue; }

    try {
      let areaId = areas.get(norm(r.area));
      if (!areaId) {
        const a = await api('/areas', { method: 'POST', body: JSON.stringify({ data: { name: r.area } }) });
        areaId = a.data.id;
        areas.set(norm(r.area), areaId);
        newAreas++;
      }

      const body = {
        pincode: r.pincode,
        state: r.state,
        postOffice: r.postOffice,
        postOfficeType: r.postOfficeType || undefined,
        city: cityId,
        areas: [areaId],
        slug: r.pincode,
        seoSlug: `${slugify(r.area)}-${slugify(r.city)}-pin-code-${r.pincode}`,
        metaTitle: `${r.pincode} Pin Code - ${r.area}, ${r.city}, ${r.state}`,
        metaDescription: `Find the ${r.pincode} pin code details for ${r.area}, ${r.city}, ${r.state} including post office and area information.`,
        keywords: `${r.pincode} pin code, ${r.area} pincode, ${r.city} pincode, ${r.postOffice}`,
        faqs: faqs(r),
        isActive: true,
        featured: false,
        sortOrder: 0,
      };
      await api('/pincodes', { method: 'POST', body: JSON.stringify({ data: body }) });
      created++;
    } catch (e) {
      failed++;
      console.error(`${r.pincode}: ${e.message}`);
      if (e.status === 403) { console.error('Permission denied - stopping.'); break; }
    }
  }
  console.log({ total: data.length, created, skipped, failed, newAreas });
}

main();
