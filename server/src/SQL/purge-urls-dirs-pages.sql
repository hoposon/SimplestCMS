delete from app_public.dirs d where d.url_id not in (select id from app_public.urls where url_name = 'init-url');

delete from app_public.users_urls uu where uu.url_id not in (select id from app_public.urls where url_name = 'init-url');

delete from app_public.pages p where p.url_id not in (select id from app_public.urls where url_name = 'init-url');

delete from app_public.urls u where u.url_name != 'init-url';
