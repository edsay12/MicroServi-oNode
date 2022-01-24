CREATE EXTENSION IF NOT EXISTS 'uuid_ossp'
CREATE EXTENSION IF NOT EXISTS 'pgcrypto'

CREATE TABLE IF NOT EXISTS app_user (
    uuid uuid default uuid_generate_v4(),
    user_name varchar(20) NOT NULL,
    password varchar(30) NOT NULL,
    primary key (uuid)
)

INSERT INTO app_user(user_name,password) VALUES ('admin',crypt('admin','my_salt'))

-- o Cript gera um hash para a nossa senha 
-- o uuid_generate_v4()  -> gera um id aleatorioa unico (tambem e um hash)