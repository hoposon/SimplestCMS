insert into app_public.users(email, password_hash) values('init@init.init', 'dsafsd512..,dki<>?>//');

insert into app_public.urls(url_name) values('init-url');

insert into app_public.users_urls(user_id, url_id, is_owner) 
select u.id, l.id, true 
from 
	(select id from app_public.users where email = 'init@init.init') u, 
	(select id from app_public.urls where url_name = 'init-url') l;

insert into app_public.dirs(id, dir_name, parent_dir, is_root, url_id)
select 0, 'root', 0, true, id from app_public.urls where url_name = 'init-url';