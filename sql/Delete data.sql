DELETE FROM `tenbis1`.`dish_to_salad_ingredient` where dish_id > 0;
DELETE FROM `tenbis1`.`order_to_dish` where order_id > 0;
DELETE FROM `tenbis1`.`standard_order` where id > 0;
DELETE FROM `tenbis1`.`pooled_order` where id > 0;
DELETE FROM `tenbis1`.`dish` where id > 0;
DELETE FROM `tenbis1`.`customer` where id > 0;
DELETE FROM `tenbis1`.`company` where id > 0;