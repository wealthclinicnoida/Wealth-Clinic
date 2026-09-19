'use strict';

/**
 * Auto-generates `seoSlug` as {area}-{city}-pin-code-{pincode} whenever it is
 * left blank, e.g. "sector-62-noida-pin-code-201301". Leaves it untouched if
 * a value was already provided (manual import, admin edit, etc.).
 */

const slugify = (value) =>
  String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const resolveRelationId = (relation) => {
  if (Array.isArray(relation)) relation = relation[0];
  if (!relation) return null;
  if (typeof relation === 'object') {
    if (Array.isArray(relation.connect) && relation.connect.length) {
      const first = relation.connect[0];
      return typeof first === 'object' ? first.id : first;
    }
    return relation.id ?? relation;
  }
  return relation;
};

const buildSeoSlug = async ({ cityId, areaId, pincode }) => {
  if (!cityId || !areaId || !pincode) return null;

  const [city, area] = await Promise.all([
    strapi.entityService.findOne('api::create-city.create-city', cityId, {
      fields: ['City_Name'],
    }),
    strapi.entityService.findOne('api::area.area', areaId, {
      fields: ['name'],
    }),
  ]);

  if (!city || !area) return null;

  return `${slugify(area.name)}-${slugify(city.City_Name)}-pin-code-${pincode}`;
};

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    if (!data.seoSlug) {
      const seoSlug = await buildSeoSlug({
        cityId: resolveRelationId(data.city),
        areaId: resolveRelationId(data.areas),
        pincode: data.pincode,
      });
      if (seoSlug) data.seoSlug = seoSlug;
    }
  },

  async beforeUpdate(event) {
    const { data, where } = event.params;

    if (data.seoSlug === '') {
      const existing = await strapi.db.query('api::pincode.pincode').findOne({
        where,
        populate: { city: true, areas: true },
      });

      const seoSlug = await buildSeoSlug({
        cityId: resolveRelationId(data.city) ?? existing?.city?.id,
        areaId: resolveRelationId(data.areas) ?? existing?.areas?.[0]?.id,
        pincode: data.pincode ?? existing?.pincode,
      });
      if (seoSlug) data.seoSlug = seoSlug;
    }
  },
};
