SELECT dish.name as dish_name, count(dish.name) as orders_count FROM standard_order so
JOIN order_to_dish otd on otd.order_id = so.id
JOIN dish on dish.id = otd.dish_id
Where so.date = '2019-03-27'
GROUP by dish.name
ORDER BY count(dish.name) DESC;

SELECT dish.name, count(dish.name) FROM standard_order so
JOIN order_to_dish otd on otd.order_id = so.id
JOIN dish on dish.id = otd.dish_id
Where so.date > '2019-03-27' AND so.date < '2019-04-02'
GROUP by dish.name
ORDER BY count(dish.name) DESC

