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

