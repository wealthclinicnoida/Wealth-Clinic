'use strict';

module.exports = {
  async index(ctx) {
    try {
      const [
  cities,
  residentialSubCategories,
  commercialSubCategories,
  residentialProjects,
  newLaunches,
  builders,
  blogs,
  reviews,
  socialLinks,
] = await Promise.all([

  // Cities
  strapi.entityService.findMany('api::create-city.create-city', {
    fields: ['Title', 'Slug'],
  }),

  // Residential Sub Categories
  strapi.entityService.findMany('api::sub-category.sub-category', {
    filters: {
      category: {
        Title: {
          $eqi: 'Residential',
        },
      },
    },
    fields: ['Title', 'Slug'],
  }),

  // Commercial Sub Categories
  strapi.entityService.findMany('api::sub-category.sub-category', {
    filters: {
      category: {
        Title: {
          $eqi: 'Comercial',
        },
      },
    },
    fields: ['Title', 'Slug'],
  }),

  // Residential Projects
  strapi.entityService.findMany('api::project.project', {
    filters: {
      category: {
        Title: {
          $eqi: 'Residential',
        },
      },
    },
    fields: [
      'Project_Name',
      'Slug',
      'Min_Price',
      'Max_Price',
      'Project_Status',
      'Possession_Status',
      'RERA',
      'Project_Tag',
      'Featured',
      'newLaunches'
    ],
    populate: {
      Image: {
        fields: ['url', 'alternativeText']
      },
      create_city: {
        fields: ['Title', 'Slug']
      },
      sub_category: {
        fields: ['Title', 'Slug']
      },
      category: {
        fields: ['Title']
      }
    },
    limit: 1000,
  }),

  // New Launches
  strapi.entityService.findMany('api::project.project', {
    filters: {
      newLaunches: true,
    },
    fields: [
      'Project_Name',
      'Slug',
      'Min_Price',
      'Max_Price',
      'Project_Status'
    ],
    populate: {
      Image: {
        fields: ['url']
      },
      create_city: {
        fields: ['Title', 'Slug']
      },
      sub_category: {
        fields: ['Title']
      },
    },
    limit: 10,
  }),

  // Builders
  strapi.entityService.findMany('api::builder.builder', {
    filters: {
      Priority: true,
    },
    fields: [
      'Builder_Name',
      'Slug'
    ],
    populate: {
      Logo: {
        fields: ['url']
      }
    },
  }),

  // Blogs
  strapi.entityService.findMany('api::blog.blog', {
    sort: {
      Pubish_Date: 'desc',
    },
    fields: [
      'Title',
      'Slug',
      'Short_Description',
      'Pubish_Date',
      'Read_Time'
    ],
    populate: {
      Featured_Image: {
        fields: ['url']
      }
    },
    limit: 4,
  }),

  // Reviews
  strapi.entityService.findMany('api::review.review', {
    fields: [
      'Name',
      'Designation',
      'Rating',
      'Review'
    ],
    populate: {
      Image: {
        fields: ['url']
      }
    },
  }),

  // Social Links
  strapi.entityService.findMany(
    'api::all-social-media-link.all-social-media-link',
    {
      fields: [
        'Facebook',
        'Instagram',
        'LinkedIn',
        'Twitter',
        'Youtube'
      ],
    }
  ),
]);
    } catch (error) {
      console.error(error);
      ctx.throw(500, error);
    }
  },
};
