(SELECT 'userWatchlist', a.* FROM watchlist a WHERE 
item_id = $1 and 
user_id = $2 and 
media_id = $3)
UNION ALL
(SELECT 'userLiked', b.* FROM favorites b WHERE 
item_id = $1 and 
user_id = $2 and 
media_id = $3)
