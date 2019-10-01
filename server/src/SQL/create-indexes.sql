
CREATE INDEX users_user_roles_idx ON app_public.USER_ROLES (user_id);
CREATE INDEX user_roles_roles_idx ON app_public.USER_ROLES (role_id);

CREATE INDEX users_users_urls_idx ON app_public.USERS_URLS (user_id);
CREATE INDEX users_urls_urls_idx ON app_public.USERS_URLS (url_id);

CREATE INDEX parent_dir_idx ON app_public.DIRS (parent_dir);
CREATE INDEX urls_dirs_idx ON app_public.DIRS (url_id);

CREATE INDEX urls_pages_idx ON app_public.PAGES (url_id);

CREATE INDEX page_content_strings_idx ON app_public.CONTENT_STRINGS (page_id);
CREATE INDEX page_page_cs_idx ON app_public.PAGE_CONTENT_STRINGS (page_id);
CREATE INDEX page_cs_content_strings_idx ON app_public.PAGE_CONTENT_STRINGS (cs_id);

CREATE INDEX page_page_assets_idx ON app_public.PAGE_ASSETS (page_id);
CREATE INDEX page_assets_assets_idx ON app_public.PAGE_ASSETS (asset_id);

CREATE INDEX page_gallery_idx ON app_public.GALLERY (page_id);
CREATE INDEX page_page_gallery_idx ON app_public.PAGE_GALLERY (page_id);
CREATE INDEX page_gallery_gallery_idx ON app_public.GALLERY_ASSETS (gallery_id);

CREATE INDEX gallery_gallery_assets_idx ON app_public.GALLERY_ASSETS (gallery_id);
CREATE INDEX gallery_assets_assets_idx ON app_public.GALLERY_ASSETS (asset_id);

CREATE INDEX dirs_assets_idx ON app_public.ASSETS (directory);