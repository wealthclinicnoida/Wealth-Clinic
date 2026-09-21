'use strict';

// Usage: node scripts/seed-pincodes.js
// Reuses existing City/Area entries matched by name; creates one only if missing.

const strapiFactory = require('@strapi/strapi');

const CITY = 'api::create-city.create-city';
const AREA = 'api::area.area';
const PINCODE = 'api::pincode.pincode';

const samples = [
  {
    pincode: '201301',
    state: 'Uttar Pradesh',
    postOffice: 'Noida Sector 62',
    postOfficeType: 'Sub Office',
    city: 'Noida',
    area: 'Sector 62',
    featured: true,
    sortOrder: 1,
  },
  {
    pincode: '201304',
    state: 'Uttar Pradesh',
    postOffice: 'Noida Sector 44',
    postOfficeType: 'Sub Office',
    city: 'Noida',
    area: 'Sector 44',
    sortOrder: 2,
  },
  {
    pincode: '122002',
    state: 'Haryana',
    postOffice: 'Gurgaon DLF Phase 1',
    postOfficeType: 'Sub Office',
    city: 'Gurugram',
    area: 'DLF Phase 1',
    sortOrder: 3,
  },
  {
    pincode: '400001',
    state: 'Maharashtra',
    postOffice: 'Mumbai GPO',
    postOfficeType: 'Head Office',
    city: 'Mumbai',
    area: 'Fort',
    sortOrder: 4,
  },
  {
    pincode: '560001',
    state: 'Karnataka',
    postOffice: 'Bangalore GPO',
    postOfficeType: 'Head Office',
    city: 'Bengaluru',
    area: 'MG Road',
    sortOrder: 5,
  },
];

const slugify = (v) =>
  String(v).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const buildFaqs = (s) => [
  {
    question: `What is the pincode of ${s.area}, ${s.city}?`,
    answer: `The pincode of ${s.area}, ${s.city} is ${s.pincode}.`,
  },
  {
    question: `Which city does ${s.area} belong to?`,
    answer: `${s.area} is located in ${s.city}, ${s.state}.`,
  },
  {
    question: `Which state is ${s.area} located in?`,
    answer: `${s.area}, ${s.city} is located in ${s.state}.`,
  },
  {
    question: `What is the post office for pincode ${s.pincode}?`,
    answer: `The post office associated with pincode ${s.pincode} is ${s.postOffice}.`,
  },
];

async function findOrCreate(strapi, uid, field, name) {
  const [existing] = await strapi.entityService.findMany(uid, {
    filters: { [field]: name },
    limit: 1,
  });
  if (existing) return { entry: existing, created: false };
  const entry = await strapi.entityService.create(uid, {
    data: { [field]: name, publishedAt: new Date() },
  });
  return { entry, created: true };
}

async function main() {
  const app = await strapiFactory({ appDir: process.cwd(), distDir: process.cwd() }).load();

  for (const s of samples) {
    const seoSlug = `${slugify(s.area)}-${slugify(s.city)}-pin-code-${s.pincode}`;

    const dup = await app.entityService.findMany(PINCODE, {
      filters: { pincode: s.pincode },
      limit: 1,
    });
    if (dup.length) {
      console.log(`skip   ${s.pincode} (already exists)`);
      continue;
    }

    const city = await findOrCreate(app, CITY, 'City_Name', s.city);
    const area = await findOrCreate(app, AREA, 'name', s.area);
    if (city.created) console.log(`  + created City "${s.city}"`);
    if (area.created) console.log(`  + created Area "${s.area}"`);

    await app.entityService.create(PINCODE, {
      data: {
        pincode: s.pincode,
        state: s.state,
        postOffice: s.postOffice,
        postOfficeType: s.postOfficeType,
        city: city.entry.id,
        areas: [area.entry.id],
        slug: s.pincode,
        seoSlug,
        metaTitle: `${s.pincode} Pin Code - ${s.area}, ${s.city}, ${s.state}`,
        metaDescription: `Find the ${s.pincode} pin code details for ${s.area}, ${s.city}, ${s.state} including post office, area and delivery information.`,
        keywords: `${s.pincode} pin code, ${s.area} pincode, ${s.city} pincode, ${s.postOffice}`,
        description: `${s.area}, ${s.city} falls under pincode **${s.pincode}** in ${s.state}.`,
        faqs: buildFaqs(s),
        isActive: true,
        featured: !!s.featured,
        sortOrder: s.sortOrder,
      },
    });
    console.log(`create ${s.pincode} -> /pincode/${seoSlug}`);
  }

  await app.destroy();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
