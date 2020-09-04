with 
	param (movie_id, user_id) as (select $1, $2),
	del as (
		delete from favorite_movies m
		using param p
		where m.movie_id = p.movie_id and m.user_id = p.user_id
		returning 1
)
insert into favorite_movies (movie_id, user_id) 
select p.* 
from param p
where not exists (select 1 from del)
returning * 