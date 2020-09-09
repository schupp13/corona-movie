(SELECT 'userWatchlist', a.* FROM watchlist_season a WHERE tvshow_id = $1 and user_id = $2)
UNION ALL
(SELECT 'userLiked', b.* FROM favorite_season b WHERE tvshow_id = $1 and user_id = $2)