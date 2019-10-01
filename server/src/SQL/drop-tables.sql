DROP TABLE app_public.assets cascade;
DROP TABLE app_public.content_strings cascade;
DROP TABLE app_public.dirs cascade;
DROP TABLE app_public.gallery cascade;
DROP TABLE app_public.gallery_assets cascade;
DROP TABLE app_public.page_assets cascade;
DROP TABLE app_public.page_content_strings cascade;
DROP TABLE app_public.page_gallery cascade;
DROP TABLE app_public.pages cascade;
DROP TABLE app_public.users cascade;
DROP TABLE app_public.user_roles cascade;
DROP TABLE app_public.roles cascade;


SELECT
    'DROP TABLE app_public.' || tablename || ' cascade;'
FROM
    pg_tables
WHERE
    schemaname = 'app_public'
ORDER BY
    tablename;