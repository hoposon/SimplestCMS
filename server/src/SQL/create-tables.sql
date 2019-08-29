CREATE TABLE app_public.USERS (
	id SERIAL PRIMARY KEY,
	email VARCHAR(200) UNIQUE NOT NULL,
	nick_name VARCHAR(200),
	first_name VARCHAR(200),
	last_name VARCHAR(200),
	password_hash VARCHAR(500) NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
  	updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE app_public.URLS (
	id SERIAL PRIMARY KEY,
	url_name VARCHAR(100) UNIQUE NOT NUll
);

CREATE TABLE app_public.USERS_URLS (
	id SERIAL PRIMARY KEY,
	user_id INT REFERENCES app_public.USERS(id) NOT NULL,
	url_id INT REFERENCES app_public.URLS(id) NOT NULL,
	is_owner BOOLEAN NOT NULL,
	UNIQUE (user_id, url_id)
);

CREATE TABLE app_public.DIRS (
	id SERIAL PRIMARY KEY,
	dir_name VARCHAR(300),
	url_id INT REFERENCES app_public.URLS(id) NOT NULL,
	parent_dir INT,
	created_at timestamptz NOT NULL DEFAULT now(),
	UNIQUE (dir_name, parent_dir, url_id)
);
ALTER TABLE app_public.DIRS ADD CONSTRAINT
dirs_parent FOREIGN KEY(parent_dir) REFERENCES app_public.DIRS(id);

CREATE TABLE app_public.PAGES (
	id SERIAL PRIMARY KEY,
	page_name VARCHAR(200),
	page_code VARCHAR(200) NOT NULL,
	url_id INT REFERENCES app_public.URLS(id) NOT NULL,
	sub_url VARCHAR(100),
	created_at timestamptz NOT NULL DEFAULT now(),
  	updated_at timestamptz NOT NULL DEFAULT now(),
	UNIQUE (page_code, url_id),
	UNIQUE (url_id, sub_url)
);

CREATE TABLE app_public.CONTENT_STRINGS (
	id SERIAL PRIMARY KEY,
	page_id INT REFERENCES app_public.PAGES(id) NOT NULL,
	cs_name VARCHAR(200),
	cs_code VARCHAR(200),
	cs_value TEXT,
	created_at timestamptz NOT NULL DEFAULT now(),
 	updated_at timestamptz NOT NULL DEFAULT now(),
	UNIQUE (page_id, cs_code)
);

CREATE TABLE app_public.PAGE_CONTENT_STRINGS (
	id SERIAL PRIMARY KEY,
	cs_id INT REFERENCES app_public.CONTENT_STRINGS(id) NOT NULL,
	page_id INT REFERENCES app_public.PAGES(id) NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	published BOOLEAN
	-- check unique for page, asset_code, published=true
);

CREATE TABLE app_public.ASSETS (
	id SERIAL PRIMARY KEY,
	asset_type VARCHAR(50),
	directory INT REFERENCES app_public.DIRS(id) NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
  	updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE app_public.PAGE_ASSETS (
	id SERIAL PRIMARY KEY,
	asset_id INT REFERENCES app_public.ASSETS(id) NOT NULL,
	page_id INT REFERENCES app_public.PAGES(id) NOT NULL,
	asset_name VARCHAR(200),
	asset_code VARCHAR(200),
	created_at timestamptz NOT NULL DEFAULT now(),
 	updated_at timestamptz NOT NULL DEFAULT now(),
	published BOOLEAN,
	UNIQUE (page_id, asset_code)
	-- check unique for page, asset_code, published=true
);

CREATE TABLE app_public.GALLERY (
	id SERIAL PRIMARY KEY,
	page_id INT REFERENCES app_public.PAGES(id) NOT NULL,
	gallery_name VARCHAR(200),
	gallery_code VARCHAR(200),
	created_at timestamptz NOT NULL DEFAULT now(),
  	updated_at timestamptz NOT NULL DEFAULT now(),
	UNIQUE (page_id, gallery_code)
);

CREATE TABLE app_public.PAGE_GALLERY (
	id SERIAL PRIMARY KEY,
	gallery_id INT REFERENCES app_public.GALLERY(id) NOT NULL,
	page_id INT REFERENCES app_public.PAGES(id) NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
  	updated_at timestamptz NOT NULL DEFAULT now(),
	published BOOLEAN
);

CREATE TABLE app_public.GALLERY_ASSETS (
	id SERIAL PRIMARY KEY,
	gallery_id INT REFERENCES app_public.GALLERY(id) NOT NULL,
	asset_id INT REFERENCES app_public.ASSETS(id) NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
  	updated_at timestamptz NOT NULL DEFAULT now(),
	published BOOLEAN
);