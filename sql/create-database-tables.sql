CREATE TABLE IF NOT EXISTS company (
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS customer (
    id INT AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(10),
    email VARCHAR(100),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS dish (
    id VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(4,2),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS salad_ingredient (
    id VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(4,2),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS pooled_order (
	id VARCHAR(50) NOT NULL,
    company_id INT NOT NULL,
    restaurant_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE pooled_order 
ADD CONSTRAINT company_id_fk
FOREIGN KEY (company_id) REFERENCES company(id);

CREATE TABLE IF NOT EXISTS standard_order (
	id VARCHAR(50) NOT NULL,
    customer_id INT NOT NULL,
    price decimal(4, 2) NOT NULL,
    date DATE NOT NULL,
    address VARCHAR(255),
    pooled_order_id VARCHAR(255),
    PRIMARY KEY (id)
);

ALTER TABLE standard_order 
ADD CONSTRAINT customer_id_fk
FOREIGN KEY (customer_id) REFERENCES customer(id);

ALTER TABLE standard_order
ADD CONSTRAINT pooled_order_fk
FOREIGN KEY (pooled_order_id) REFERENCES pooled_order(id);

CREATE TABLE IF NOT EXISTS standard_order_to_dish (
	standard_order_id VARCHAR(50) NOT NULL,
    dish_id VARCHAR(50) NOT NULL
);

ALTER TABLE standard_order_to_dish
ADD CONSTRAINT standard_order_fk
FOREIGN KEY (standard_order_id) REFERENCES standard_order(id);

ALTER TABLE standard_order_to_dish
ADD CONSTRAINT dish_fk_1
FOREIGN KEY (dish_id) REFERENCES dish(id);

CREATE TABLE IF NOT EXISTS dish_to_salad_ingredient (
	dish_id VARCHAR(50) NOT NULL,
    salad_ingredient_id VARCHAR(50) NOT NULL
);

ALTER TABLE dish_to_salad_ingredient
ADD CONSTRAINT dish_fk_2
FOREIGN KEY (dish_id) REFERENCES dish(id);

ALTER TABLE dish_to_salad_ingredient
ADD CONSTRAINT salad_ingredient_id
FOREIGN KEY (salad_ingredient_id) REFERENCES salad_ingredient(id);