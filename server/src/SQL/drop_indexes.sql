
DROP INDEX app_public.parent_dir_idx;
DROP INDEX app_public.page_content_strings_idx;
DROP INDEX app_public.page_page_cs_idx;
DROP INDEX app_public.page_cs_cs_idx;
DROP INDEX app_public.page_page_assets_idx;
DROP INDEX app_public.page_assets_assets_idx;
DROP INDEX app_public.page_gallery_idx;
DROP INDEX app_public.gallery_gallery_assets_idx;
DROP INDEX app_public.gallery_assets_assets_idx;
DROP INDEX app_public.page_page_gallery_idx;
DROP INDEX app_public.page_gallery_gallery_idx;
DROP INDEX app_public.dirs_assets_idx;

SELECT
    tablename,
    indexname,
    indexdef
FROM
    pg_indexes
WHERE
    schemaname = 'app_public'
ORDER BY
    tablename,
    indexname;