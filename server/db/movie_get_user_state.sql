(SELECT 'userWatchlist', a.* FROM watchlist_movies a WHERE movie_id = $1 and user_id = $2)
UNION ALL
(SELECT 'userLiked', b.* FROM favorite_movies b WHERE movie_id = $1 and user_id = $2)
