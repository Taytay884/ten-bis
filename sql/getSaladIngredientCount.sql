SELECT si.name, count(si.name) as orders FROM standard_order so
JOIN order_to_dish otd on otd.order_id = so.id
JOIN dish on dish.id = otd.dish_id
JOIN dish_to_salad_ingredient dtsi on dtsi.dish_id = dish.id
JOIN salad_ingredient si on dtsi.salad_ingredient_id = si.id
Where date > '2019-03-27' AND date < '2019-04-03'
GROUP by si.name
ORDER BY count(si.name) DESC;