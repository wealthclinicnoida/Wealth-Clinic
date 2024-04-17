import type { Schema, Attribute } from '@strapi/strapi';

export interface BenefitsPerksCreateBenefitsAndPerks extends Schema.Component {
  collectionName: 'components_benefits_perks_create_benefits_and_perks';
  info: {
    displayName: 'Create-Benefits-And-Perks';
  };
  attributes: {
    Icon: Attribute.Media & Attribute.Required;
    Title: Attribute.String & Attribute.Required;
  };
}

export interface BranchesCreateBranches extends Schema.Component {
  collectionName: 'components_branches_create_branches';
  info: {
    displayName: 'Create Branches';
    description: '';
  };
  attributes: {
    Branch_Name: Attribute.String;
    Email: Attribute.String;
    Contact: Attribute.BigInteger;
    HR_Contact: Attribute.BigInteger;
    Address: Attribute.Text;
    Image: Attribute.Media & Attribute.Required;
  };
}

export interface BrochureCreateBrochure extends Schema.Component {
  collectionName: 'components_brochure_create_brochures';
  info: {
    displayName: 'Create Brochure';
    icon: 'chartCircle';
  };
  attributes: {
    Brochure: Attribute.Media;
  };
}

export interface FloorPlanCreateFloorPlan extends Schema.Component {
  collectionName: 'components_floor_plan_create_floor_plans';
  info: {
    displayName: 'Create-Floor-Plan';
    icon: 'filter';
  };
  attributes: {
    Images: Attribute.Media & Attribute.Required;
  };
}

export interface FourPillersCreatePillers extends Schema.Component {
  collectionName: 'components_four_pillers_create_pillers';
  info: {
    displayName: 'Create Pillers';
    icon: 'dashboard';
    description: '';
  };
  attributes: {
    Title: Attribute.String & Attribute.Required;
    Description: Attribute.Text & Attribute.Required;
    Pillers_Image: Attribute.Media & Attribute.Required;
  };
}

export interface LocationMapAddLocationMap extends Schema.Component {
  collectionName: 'components_location_map_add_location_maps';
  info: {
    displayName: 'Add-Location-Map';
    icon: 'earth';
  };
  attributes: {
    Location_Map: Attribute.Text;
    Location_Description: Attribute.Text;
  };
}

export interface NearAreasCreateNearAreas extends Schema.Component {
  collectionName: 'components_near_areas_create_near_areas';
  info: {
    displayName: 'Create-Near-Areas';
    icon: 'priceTag';
  };
  attributes: {
    Area_Name: Attribute.String;
  };
}

export interface OurEthosCreateEthos extends Schema.Component {
  collectionName: 'components_our_ethos_create_ethos';
  info: {
    displayName: 'Create Ethos';
  };
  attributes: {
    Ethos_Icon: Attribute.Media & Attribute.Required;
    Ethos_Title: Attribute.String;
    Ethos_Description: Attribute.Text;
  };
}

export interface PriceListCreatePriceList extends Schema.Component {
  collectionName: 'components_price_list_create_price_lists';
  info: {
    displayName: 'Create Price List';
    icon: 'stack';
  };
  attributes: {
    Price_List: Attribute.Media & Attribute.Required;
  };
}

export interface ResidenceVideoAddResidenceVideo extends Schema.Component {
  collectionName: 'components_residence_video_add_residence_videos';
  info: {
    displayName: 'Add-Residence-Video';
    icon: 'cube';
  };
  attributes: {
    Residence_Video: Attribute.String;
  };
}

export interface SpecificationsCreateSpecifications extends Schema.Component {
  collectionName: 'components_specifications_create_specifications';
  info: {
    displayName: 'Create-Specifications';
    icon: 'pin';
  };
  attributes: {
    Title: Attribute.String;
    Descriptions: Attribute.Text;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'benefits-perks.create-benefits-and-perks': BenefitsPerksCreateBenefitsAndPerks;
      'branches.create-branches': BranchesCreateBranches;
      'brochure.create-brochure': BrochureCreateBrochure;
      'floor-plan.create-floor-plan': FloorPlanCreateFloorPlan;
      'four-pillers.create-pillers': FourPillersCreatePillers;
      'location-map.add-location-map': LocationMapAddLocationMap;
      'near-areas.create-near-areas': NearAreasCreateNearAreas;
      'our-ethos.create-ethos': OurEthosCreateEthos;
      'price-list.create-price-list': PriceListCreatePriceList;
      'residence-video.add-residence-video': ResidenceVideoAddResidenceVideo;
      'specifications.create-specifications': SpecificationsCreateSpecifications;
    }
  }
}
