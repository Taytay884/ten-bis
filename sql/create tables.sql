CREATE TABLE IF NOT EXISTS company (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    address varchar(255),
    PRIMARY KEY (id)
); 

CREATE TABLE IF NOT EXISTS customer (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    phone varchar(255),
    email varchar(255),
    PRIMARY KEY (id),
    CONSTRAINT unique_customer UNIQUE (phone, email)
); 

CREATE TABLE IF NOT EXISTS dish (
    id int NOT NULL,
    name varchar(255) NOT NULL,
    price int,
    PRIMARY KEY (id)
); 

CREATE TABLE IF NOT EXISTS salad_ingredient (
    id int NOT NULL,
    name varchar(255) NOT NULL,
    price int,
    PRIMARY KEY (id)
); 

CREATE TABLE IF NOT EXISTS pooled_order (
    id int NOT NULL,
    company_id int NOT NULL,
    restaurant_name varchar(255) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT company_id_fk foreign key (company_id) references company(id)
); 

CREATE TABLE IF NOT EXISTS standard_order (
    id int NOT NULL,
    date DATE NOT NULL,
    customer_id int NOT NULL,
    price decimal(5, 2) NOT NULL,
    address varchar(255),
    pooled_order_id int,
    PRIMARY KEY (id),
    CONSTRAINT customer_id_fk foreign key (customer_id) references customer(id),
    CONSTRAINT pooled_order_id_fk foreign key (pooled_order_id) references pooled_order(id)
);

CREATE TABLE IF NOT EXISTS order_to_dish (
	order_id int NOT NULL,
    dish_id int not null,
    CONSTRAINT order_id_fk foreign key (order_id) references standard_order(id),
    CONSTRAINT dish_id_fk_1 foreign key (dish_id) references dish(id)
);

CREATE TABLE IF NOT EXISTS dish_to_salad_ingredient (
    dish_id int not null,
    salad_ingredient_id int not null,
    CONSTRAINT salad_ingredient_id_fk foreign key (salad_ingredient_id) references salad_ingredient(id),
    CONSTRAINT dish_id_fk_2 foreign key (dish_id) references dish(id)
);