with 
	param (item_id, user_id, media_id) as (select $1, $2, $3),
	del as (
		delete from favorites m
		using param p
		where m.item_id = p.item_id and m.user_id = p.user_id and m.media_id = p.media_id
		returning 1
)
insert into favorites (item_id, user_id, media_id) 
select p.* 
from param p
where not exists (select 1 from del)
returning * 