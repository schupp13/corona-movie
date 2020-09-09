with 
	param (season_id, user_id) as (select $1, $2),
	del as (
		delete from watchlist_season m
		using param p
		where m.season_id = p.season_id and m.user_id = p.user_id
		returning 1
)
insert into watchlist_season (season_id, user_id) 
select p.* 
from param p
where not exists (select 1 from del)
returning * 