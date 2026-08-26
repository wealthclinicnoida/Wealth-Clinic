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
    fields: ['City_Name', 'Slug'],
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
    fields: ['Title'],
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
    fields: ['Title'],
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
      'Slug_Url',
      'Min_Price',
      'Max_Price',
      'newLaunches'
    ],
    populate: {
      Image: {
        fields: ['url', 'alternativeText']
      },
      create_city: {
        fields: ['City_Name', 'Slug']
      },
      sub_categories: {
        fields: ['Title']
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
      'Slug_Url',
      'Min_Price',
      'Max_Price'
    ],
    populate: {
      Image: {
        fields: ['url']
      },
      create_city: {
        fields: ['City_Name', 'Slug']
      },
      sub_categories: {
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
      'Slug_Url'
    ],
    populate: {
      Builder_Image: {
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
      'Slug_Url',
      'Pubish_Date'
    ],
    populate: {
      BlogImg: {
        fields: ['url']
      }
    },
    limit: 4,
  }),

  // Reviews
  strapi.entityService.findMany('api::review.review', {
    fields: [
      'name',
      'rating',
      'comment'
    ],
    populate: {
      image: {
        fields: ['url']
      }
    },
  }),

  // Social Links
  strapi.entityService.findMany(
    'api::all-social-media-link.all-social-media-link',
    {
      fields: [
        'Facebook_URL',
        'Instagram_URL',
        'Linkdin_URL',
        'Twitter_URL',
        'YouTube_URL'
      ],
    }
  ),
]);

      ctx.body = {
        cities,
        residentialSubCategories,
        commercialSubCategories,
        residentialProjects,
        newLaunches,
        builders,
        blogs,
        reviews,
        socialLinks,
      };
    } catch (error) {
      console.error(error);
      ctx.throw(500, error);
    }
  },
};
