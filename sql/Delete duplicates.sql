CREATE TABLE tempTableName LIKE order_to_dish;  
CREATE INDEX ix_all_id ON order_to_dish(order_id, dish_id);  
INSERT INTO tempTableName(order_id, dish_id) SELECT DISTINCT order_id, dish_id FROM order_to_dish;  
DROP TABLE order_to_dish;  
CREATE TABLE order_to_dish LIKE tempTableName;
INSERT order_to_dish SELECT * FROM tempTableName;  
DROP TABLE tempTableName;  

Alter table order_to_dish
ADD CONSTRAINT order_id_fk_1 FOREIGN KEY (order_id)     REFERENCES standard_order(id);
 
Alter table order_to_dish
ADD CONSTRAINT dish_id_fk_1 FOREIGN KEY (dish_id)     REFERENCES dish(id);