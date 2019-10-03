CREATE FUNCTION app_public.create_users_urls(name varchar, user_id integer, is_owner boolean)
RETURNS TABLE (url_id integer, url_name varchar, owner boolean) AS $$
DECLARE 
	url_id integer;
BEGIN
	insert into app_public.urls (url_name) values (name) returning id into url_id;
	insert into app_public.users_urls(user_id, url_id, is_owner) values (user_id, url_id, is_owner);
        
	RETURN QUERY SELECT url_id, name, is_owner;
END;
$$  LANGUAGE plpgsql;

CREATE FUNCTION app_public.create_pages(
	in_page_name varchar, 
	in_page_code varchar,
	in_url_id integer,
	in_sub_url varchar,
	in_user_id integer
	)
-- RETURNS TABLE (id integer, page_name varchar, page_code varchar, url_id integer, sub_url varchar) AS $$
RETURNS integer AS $$
DECLARE 
	out_id integer;
BEGIN

	insert into app_public.pages (page_name, page_code, url_id, sub_url)
	SELECT in_page_name, in_page_code, u.url_id, in_sub_url 
	from app_public.users_urls u
	where u.url_id = in_url_id
	and   u.user_id = in_user_id
	returning id into out_id;
	
	return out_id;
	

END;
$$  LANGUAGE plpgsql;