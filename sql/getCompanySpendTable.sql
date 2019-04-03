SELECT c.name, sum(so.price) as price  FROM tenbis1.pooled_order as po
JOIN tenbis1.standard_order as so ON so.pooled_order_id = po.id
JOIN tenbis1.company as c ON po.company_id = c.id
Where date > '2019-03-27' AND date < '2019-04-03'
group by name
order by price desc