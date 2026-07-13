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
          populate: '*',
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
          populate: '*',
        }),

        // Commercial Sub Categories
        strapi.entityService.findMany('api::sub-category.sub-category', {
          filters: {
            category: {
              Title: {
                $eqi: 'Comercial', // Change to Commercial if that's your actual value
              },
            },
          },
          populate: '*',
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
          populate: {
            create_city: true,
            sub_category: true,
            category: true,
            Image: true,
          },
          limit: 1000,
        }),

        // New Launches
        strapi.entityService.findMany('api::project.project', {
          filters: {
            newLaunches: true,
          },
          populate: {
            Image: true,
            sub_category: true,
            create_city: true,
            category: true,
          },
          limit: 10,
        }),

        // Priority Builders
        strapi.entityService.findMany('api::builder.builder', {
          filters: {
            Priority: true,
          },
          populate: '*',
        }),

        // Latest Blogs
        strapi.entityService.findMany('api::blog.blog', {
          sort: {
            Pubish_Date: 'desc',
          },
          populate: '*',
          limit: 4,
        }),

        // Reviews
        strapi.entityService.findMany('api::review.review', {
          populate: '*',
        }),

        // Social Media Links
        strapi.entityService.findMany(
          'api::all-social-media-link.all-social-media-link',
          {
            populate: '*',
          }
        ),
      ]);

      ctx.body = {
        success: true,

        cities,

        subCategories: {
          residential: residentialSubCategories,
          commercial: commercialSubCategories,
        },

        projects: {
          residential: residentialProjects,
          newLaunches,
        },

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
