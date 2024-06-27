import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginSchedulerScheduler extends Schema.CollectionType {
  collectionName: 'scheduler_scheduler';
  info: {
    collectionName: 'scheduler';
    singularName: 'scheduler';
    pluralName: 'scheduler';
    displayName: 'scheduler';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    uid: Attribute.String & Attribute.Required;
    entryId: Attribute.BigInteger & Attribute.Required;
    type: Attribute.Enumeration<['publish', 'archive']> & Attribute.Required;
    datetime: Attribute.DateTime;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::scheduler.scheduler',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::scheduler.scheduler',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAboutUsAboutUs extends Schema.SingleType {
  collectionName: 'about_uses';
  info: {
    singularName: 'about-us';
    pluralName: 'about-uses';
    displayName: 'About-US';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    AboutUs_Heading: Attribute.String & Attribute.Required;
    AboutUs_Title: Attribute.String & Attribute.Required;
    AboutUs_Image: Attribute.Media & Attribute.Required;
    AboutUs_Description: Attribute.Blocks & Attribute.Required;
    Our_Vision_Title: Attribute.String;
    Our_Vision_Image: Attribute.Media & Attribute.Required;
    Our_Vision_Description: Attribute.Blocks & Attribute.Required;
    Our_Mission_Title: Attribute.String;
    Our_Mission_Image: Attribute.Media & Attribute.Required;
    Our_Mission_Description: Attribute.Blocks & Attribute.Required;
    Add_PIllers: Attribute.Component<'four-pillers.create-pillers', true>;
    Four_Piller_Heading: Attribute.String & Attribute.Required;
    Owner_Name: Attribute.String;
    Owner_Designation: Attribute.String & Attribute.Required;
    Full_Description: Attribute.Text;
    Owner_Name_2: Attribute.String;
    Owner_Designation_2: Attribute.String;
    Full_Description_2: Attribute.Text;
    Owner_Image: Attribute.Media;
    Owner_Image_2: Attribute.Media;
    Meta_Title: Attribute.String;
    Meta_Description: Attribute.Text;
    Meta_Keyword: Attribute.String;
    Meta_Link: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::about-us.about-us',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::about-us.about-us',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAllSocialMediaLinkAllSocialMediaLink
  extends Schema.SingleType {
  collectionName: 'all_social_media_links';
  info: {
    singularName: 'all-social-media-link';
    pluralName: 'all-social-media-links';
    displayName: 'All-Social-Media-Links';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Facebook_URL: Attribute.String & Attribute.Required;
    Instagram_URL: Attribute.String & Attribute.Required;
    Twitter_URL: Attribute.String & Attribute.Required;
    Linkdin_URL: Attribute.String & Attribute.Required;
    YouTube_URL: Attribute.String & Attribute.Required;
    WhatsApp_URL: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::all-social-media-link.all-social-media-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::all-social-media-link.all-social-media-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAmenityAmenity extends Schema.CollectionType {
  collectionName: 'amenities';
  info: {
    singularName: 'amenity';
    pluralName: 'amenities';
    displayName: 'Amenity';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String & Attribute.Required;
    Icon: Attribute.Media & Attribute.Required;
    amenity_category: Attribute.Relation<
      'api::amenity.amenity',
      'oneToOne',
      'api::amenity-category.amenity-category'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::amenity.amenity',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::amenity.amenity',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAmenityCategoryAmenityCategory
  extends Schema.CollectionType {
  collectionName: 'amenity_categories';
  info: {
    singularName: 'amenity-category';
    pluralName: 'amenity-categories';
    displayName: 'Amenity-Category';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Category_Name: Attribute.String & Attribute.Required;
    Image: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::amenity-category.amenity-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::amenity-category.amenity-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAwardAward extends Schema.CollectionType {
  collectionName: 'awards';
  info: {
    singularName: 'award';
    pluralName: 'awards';
    displayName: 'Award';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Award_Title: Attribute.String & Attribute.Required;
    Award_Date: Attribute.Date;
    Award_Image: Attribute.Media & Attribute.Required;
    Description: Attribute.Text;
    Meta_Title: Attribute.String;
    Meta_Link: Attribute.String;
    Meta_Description: Attribute.Text;
    Meta_Keyword: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::award.award',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::award.award',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlogBlog extends Schema.CollectionType {
  collectionName: 'blogs';
  info: {
    singularName: 'blog';
    pluralName: 'blogs';
    displayName: 'Blog';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String & Attribute.Required;
    Image: Attribute.Media & Attribute.Required;
    Pubish_Date: Attribute.Date & Attribute.Required;
    Meta_Title: Attribute.String;
    Meta_Description: Attribute.Text;
    Meta_Keyword: Attribute.Text;
    Schema: Attribute.Text;
    Description: Attribute.Blocks;
    blog_categories: Attribute.Relation<
      'api::blog.blog',
      'oneToMany',
      'api::blog-category.blog-category'
    >;
    comments: Attribute.Relation<
      'api::blog.blog',
      'oneToMany',
      'api::comment.comment'
    >;
    Meta_Link: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiBlogCategoryBlogCategory extends Schema.CollectionType {
  collectionName: 'blog_categories';
  info: {
    singularName: 'blog-category';
    pluralName: 'blog-categories';
    displayName: 'Blog-Category';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Category_Name: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::blog-category.blog-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::blog-category.blog-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBuilderBuilder extends Schema.CollectionType {
  collectionName: 'builders';
  info: {
    singularName: 'builder';
    pluralName: 'builders';
    displayName: 'Builders';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Builder_Name: Attribute.String & Attribute.Required;
    Email: Attribute.Email & Attribute.Required;
    Builder_Image: Attribute.Media & Attribute.Required;
    Builder_Experience: Attribute.Integer;
    Total_Projects_of_Builder: Attribute.Integer;
    Address: Attribute.Text;
    Zip_Code: Attribute.String;
    Phone: Attribute.BigInteger;
    Builder_Disclaimer: Attribute.Text;
    countries: Attribute.Relation<
      'api::builder.builder',
      'oneToMany',
      'api::countrie.countrie'
    >;
    create_states: Attribute.Relation<
      'api::builder.builder',
      'oneToMany',
      'api::create-state.create-state'
    >;
    create_cities: Attribute.Relation<
      'api::builder.builder',
      'oneToMany',
      'api::create-city.create-city'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::builder.builder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::builder.builder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCareerCareer extends Schema.SingleType {
  collectionName: 'careers';
  info: {
    singularName: 'career';
    pluralName: 'careers';
    displayName: 'Career';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Career_Heading: Attribute.String & Attribute.Required;
    Career_Image: Attribute.Media & Attribute.Required;
    Career_Description: Attribute.Blocks & Attribute.Required;
    Ethos_Heading: Attribute.String & Attribute.Required;
    Add_Ethos: Attribute.Component<'our-ethos.create-ethos', true>;
    Ethos_Description: Attribute.Text;
    Benefits_Perks_Heading: Attribute.String & Attribute.Required;
    Benefits_And_Perks_Description: Attribute.Text;
    Benefits_Perks: Attribute.Component<
      'benefits-perks.create-benefits-and-perks',
      true
    >;
    career_positions: Attribute.Relation<
      'api::career.career',
      'oneToMany',
      'api::career-position.career-position'
    >;
    Meta_Title: Attribute.String;
    Meta_Link: Attribute.String;
    Meta_Description: Attribute.Text;
    Meta_Keyword: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::career.career',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::career.career',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCareerDepartmentCareerDepartment
  extends Schema.CollectionType {
  collectionName: 'career_departments';
  info: {
    singularName: 'career-department';
    pluralName: 'career-departments';
    displayName: 'Career-Department';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Department_Name: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::career-department.career-department',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::career-department.career-department',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCareerPositionCareerPosition extends Schema.CollectionType {
  collectionName: 'career_positions';
  info: {
    singularName: 'career-position';
    pluralName: 'career-positions';
    displayName: 'Career-Position';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Position_Name: Attribute.String & Attribute.Required;
    Position_Location: Attribute.String & Attribute.Required;
    Position_Description: Attribute.Blocks;
    career_department: Attribute.Relation<
      'api::career-position.career-position',
      'oneToOne',
      'api::career-department.career-department'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::career-position.career-position',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::career-position.career-position',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategoryCategory extends Schema.CollectionType {
  collectionName: 'categories';
  info: {
    singularName: 'category';
    pluralName: 'categories';
    displayName: 'Category';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiClientSatisfactionClientSatisfaction
  extends Schema.SingleType {
  collectionName: 'client_satisfactions';
  info: {
    singularName: 'client-satisfaction';
    pluralName: 'client-satisfactions';
    displayName: 'Client satisfaction';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Meta_Title: Attribute.String;
    Meta_Keyword: Attribute.String;
    Meta_Link: Attribute.String;
    Meta_Description: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::client-satisfaction.client-satisfaction',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::client-satisfaction.client-satisfaction',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCommentComment extends Schema.CollectionType {
  collectionName: 'comments';
  info: {
    singularName: 'comment';
    pluralName: 'comments';
    displayName: 'Comment';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    UserName: Attribute.String & Attribute.Required;
    comments: Attribute.Text & Attribute.Required;
    blogId: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::comment.comment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::comment.comment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContactUsContactUs extends Schema.SingleType {
  collectionName: 'contact_uses';
  info: {
    singularName: 'contact-us';
    pluralName: 'contact-uses';
    displayName: 'ContactUs';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String & Attribute.Required;
    Branches: Attribute.Component<'branches.create-branches', true>;
    Meta_Title: Attribute.String;
    Meta_Link: Attribute.String;
    Meta_Description: Attribute.Text;
    Meta_Keyword: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contact-us.contact-us',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contact-us.contact-us',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCountrieCountrie extends Schema.CollectionType {
  collectionName: 'countries';
  info: {
    singularName: 'countrie';
    pluralName: 'countries';
    displayName: 'Countries';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Country_Name: Attribute.String & Attribute.Required;
    Short_Code: Attribute.String;
    Phone_Code: Attribute.Integer;
    award: Attribute.Relation<
      'api::countrie.countrie',
      'oneToOne',
      'api::award.award'
    >;
    builder: Attribute.Relation<
      'api::countrie.countrie',
      'oneToOne',
      'api::builder.builder'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::countrie.countrie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::countrie.countrie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCreateCityCreateCity extends Schema.CollectionType {
  collectionName: 'create_cities';
  info: {
    singularName: 'create-city';
    pluralName: 'create-cities';
    displayName: 'Create City';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    City_Name: Attribute.String;
    create_state: Attribute.Relation<
      'api::create-city.create-city',
      'oneToOne',
      'api::create-state.create-state'
    >;
    builder: Attribute.Relation<
      'api::create-city.create-city',
      'oneToOne',
      'api::builder.builder'
    >;
    Meta_Title: Attribute.String;
    Meta_Link: Attribute.String;
    Meta_Description: Attribute.String;
    Meta_Keyword: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::create-city.create-city',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::create-city.create-city',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCreateStateCreateState extends Schema.CollectionType {
  collectionName: 'create_states';
  info: {
    singularName: 'create-state';
    pluralName: 'create-states';
    displayName: 'Create State';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    State_Name: Attribute.String;
    country: Attribute.Relation<
      'api::create-state.create-state',
      'oneToOne',
      'api::countrie.countrie'
    >;
    builder: Attribute.Relation<
      'api::create-state.create-state',
      'oneToOne',
      'api::builder.builder'
    >;
    Meta_Title: Attribute.String;
    Meta_Description: Attribute.Text;
    Meta_Keyword: Attribute.String;
    Meta_Link: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::create-state.create-state',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::create-state.create-state',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDisclaimerDisclaimer extends Schema.SingleType {
  collectionName: 'disclaimers';
  info: {
    singularName: 'disclaimer';
    pluralName: 'disclaimers';
    displayName: 'Disclaimer';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Meta_Title: Attribute.String;
    Meta_Link: Attribute.String;
    Meta_Description: Attribute.Text;
    Meta_Keyword: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::disclaimer.disclaimer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::disclaimer.disclaimer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEventEvent extends Schema.CollectionType {
  collectionName: 'events';
  info: {
    singularName: 'event';
    pluralName: 'events';
    displayName: 'Events';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String & Attribute.Required;
    Featured_Image: Attribute.Media & Attribute.Required;
    Start_Date: Attribute.Date & Attribute.Required;
    End_Date: Attribute.Date;
    Venue: Attribute.Text;
    Event_Description: Attribute.Blocks & Attribute.Required;
    Meta_Title: Attribute.String;
    Meta_Keyword: Attribute.String;
    Meta_Description: Attribute.Text;
    Schema: Attribute.Text;
    create_cities: Attribute.Relation<
      'api::event.event',
      'oneToMany',
      'api::create-city.create-city'
    >;
    create_states: Attribute.Relation<
      'api::event.event',
      'oneToMany',
      'api::create-state.create-state'
    >;
    countries: Attribute.Relation<
      'api::event.event',
      'oneToMany',
      'api::countrie.countrie'
    >;
    Enter_The_Time: Attribute.Time & Attribute.Required;
    Meta_Link: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHappyCustomerHappyCustomer extends Schema.SingleType {
  collectionName: 'happy_customers';
  info: {
    singularName: 'happy-customer';
    pluralName: 'happy-customers';
    displayName: 'Happy Customer';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Meta_Title: Attribute.String;
    Meta_Keyword: Attribute.String;
    Meta_Link: Attribute.String;
    Meta_Description: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::happy-customer.happy-customer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::happy-customer.happy-customer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMediaCoverageMediaCoverage extends Schema.CollectionType {
  collectionName: 'media_coverages';
  info: {
    singularName: 'media-coverage';
    pluralName: 'media-coverages';
    displayName: 'Media Coverage';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String & Attribute.Required;
    Media_Coverage_Image: Attribute.Media & Attribute.Required;
    Description: Attribute.Text;
    Category: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        ['Press Release', 'News']
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::media-coverage.media-coverage',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::media-coverage.media-coverage',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPrivacyPolicyPrivacyPolicy extends Schema.SingleType {
  collectionName: 'privacy_policies';
  info: {
    singularName: 'privacy-policy';
    pluralName: 'privacy-policies';
    displayName: 'Privacy Policy';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Meta_Title: Attribute.String;
    Meta_Link: Attribute.String;
    Meta_Keyword: Attribute.String;
    Meta_Description: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::privacy-policy.privacy-policy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::privacy-policy.privacy-policy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectProject extends Schema.CollectionType {
  collectionName: 'projects';
  info: {
    singularName: 'project';
    pluralName: 'projects';
    displayName: 'Projects';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Project_Name: Attribute.String;
    RegNo: Attribute.String;
    Image: Attribute.Media;
    Min_Price: Attribute.Integer;
    Max_Price: Attribute.Integer;
    Total_Floors: Attribute.Integer;
    TotalPropertySize: Attribute.Integer;
    Possession_Month_Year: Attribute.Date;
    Description: Attribute.Blocks;
    Project_Configuration: Attribute.String;
    Meta_Title: Attribute.String;
    Meta_Keyword: Attribute.String;
    Schema: Attribute.Text;
    Meta_Description: Attribute.Text;
    Address: Attribute.Text;
    Project_Disclaimer: Attribute.Text;
    Add_Price_List: Attribute.Component<'price-list.create-price-list'>;
    Floor_Plan: Attribute.Component<'floor-plan.create-floor-plan'>;
    Brochures: Attribute.Component<'brochure.create-brochure', true>;
    Near_Areas: Attribute.Component<'near-areas.create-near-areas', true>;
    Location_Map: Attribute.Component<'location-map.add-location-map'>;
    Residence_Video: Attribute.Component<'residence-video.add-residence-video'>;
    Specifications: Attribute.Component<
      'specifications.create-specifications',
      true
    >;
    amenities: Attribute.Relation<
      'api::project.project',
      'oneToMany',
      'api::amenity.amenity'
    >;
    builder: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'api::builder.builder'
    >;
    property_type: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'api::property-type.property-type'
    >;
    category: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'api::category.category'
    >;
    sub_category: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'api::sub-category.sub-category'
    >;
    country: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'api::countrie.countrie'
    >;
    create_state: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'api::create-state.create-state'
    >;
    create_city: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'api::create-city.create-city'
    >;
    Priority: Attribute.Boolean;
    Meta_Link: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPropertyTypePropertyType extends Schema.CollectionType {
  collectionName: 'property_types';
  info: {
    singularName: 'property-type';
    pluralName: 'property-types';
    displayName: 'Property-Type';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String & Attribute.Required;
    Image: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::property-type.property-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::property-type.property-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSubCategorySubCategory extends Schema.CollectionType {
  collectionName: 'sub_categories';
  info: {
    singularName: 'sub-category';
    pluralName: 'sub-categories';
    displayName: 'Sub-Category';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String & Attribute.Required;
    category: Attribute.Relation<
      'api::sub-category.sub-category',
      'oneToOne',
      'api::category.category'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sub-category.sub-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::sub-category.sub-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTeamTeam extends Schema.CollectionType {
  collectionName: 'teams';
  info: {
    singularName: 'team';
    pluralName: 'teams';
    displayName: 'Team';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String & Attribute.Required;
    Profile_Image: Attribute.Media & Attribute.Required;
    Designation: Attribute.String;
    Description: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::team.team', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::team.team', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiTermsAndConditionsTermsAndConditions
  extends Schema.SingleType {
  collectionName: 'term_and_conditions';
  info: {
    singularName: 'terms-and-conditions';
    pluralName: 'term-and-conditions';
    displayName: 'Terms and conditions';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Meta_Title: Attribute.String;
    Meta_Keyword: Attribute.String;
    Meta_Link: Attribute.String;
    Meta_Description: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::terms-and-conditions.terms-and-conditions',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::terms-and-conditions.terms-and-conditions',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTestimonialTestimonial extends Schema.CollectionType {
  collectionName: 'testimonials';
  info: {
    singularName: 'testimonial';
    pluralName: 'testimonials';
    displayName: 'Testimonials';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Testimonials_Name: Attribute.String & Attribute.Required;
    YouTube_Thumbnail: Attribute.Media & Attribute.Required;
    YouTube_link: Attribute.Text;
    Description: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::testimonial.testimonial',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::testimonial.testimonial',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::scheduler.scheduler': PluginSchedulerScheduler;
      'api::about-us.about-us': ApiAboutUsAboutUs;
      'api::all-social-media-link.all-social-media-link': ApiAllSocialMediaLinkAllSocialMediaLink;
      'api::amenity.amenity': ApiAmenityAmenity;
      'api::amenity-category.amenity-category': ApiAmenityCategoryAmenityCategory;
      'api::award.award': ApiAwardAward;
      'api::blog.blog': ApiBlogBlog;
      'api::blog-category.blog-category': ApiBlogCategoryBlogCategory;
      'api::builder.builder': ApiBuilderBuilder;
      'api::career.career': ApiCareerCareer;
      'api::career-department.career-department': ApiCareerDepartmentCareerDepartment;
      'api::career-position.career-position': ApiCareerPositionCareerPosition;
      'api::category.category': ApiCategoryCategory;
      'api::client-satisfaction.client-satisfaction': ApiClientSatisfactionClientSatisfaction;
      'api::comment.comment': ApiCommentComment;
      'api::contact-us.contact-us': ApiContactUsContactUs;
      'api::countrie.countrie': ApiCountrieCountrie;
      'api::create-city.create-city': ApiCreateCityCreateCity;
      'api::create-state.create-state': ApiCreateStateCreateState;
      'api::disclaimer.disclaimer': ApiDisclaimerDisclaimer;
      'api::event.event': ApiEventEvent;
      'api::happy-customer.happy-customer': ApiHappyCustomerHappyCustomer;
      'api::media-coverage.media-coverage': ApiMediaCoverageMediaCoverage;
      'api::privacy-policy.privacy-policy': ApiPrivacyPolicyPrivacyPolicy;
      'api::project.project': ApiProjectProject;
      'api::property-type.property-type': ApiPropertyTypePropertyType;
      'api::sub-category.sub-category': ApiSubCategorySubCategory;
      'api::team.team': ApiTeamTeam;
      'api::terms-and-conditions.terms-and-conditions': ApiTermsAndConditionsTermsAndConditions;
      'api::testimonial.testimonial': ApiTestimonialTestimonial;
    }
  }
}
