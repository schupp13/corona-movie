(SELECT 'userWatchlist', a.* FROM watchlist_tvshow a WHERE tvshow_id = $1 and user_id = $2)
UNION ALL
(SELECT 'userLiked', b.* FROM favorite_tvshow b WHERE tvshow_id = $1 and user_id = $2)
