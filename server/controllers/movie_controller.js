module.exports = {
  createFavorite: async (req, res) => {
    const { user_id, movie_id } = req.body;
    const check = await req.app
      .get("db")
      .movie_create_favorite(movie_id, user_id);
    if (check[0]) {
      res.status(200).send({ userLiked: true });
    } else {
      res.status(200).send({ userLiked: false });
    }
  },
  getFavorite: async (req, res) => {
    const { user_id, movie_id } = req.body;
    const check = await req.app.get("db").movie_get_favorite(movie_id, user_id);

    if (check[0]) {
      res.send(check[0]);
    } else {
      res.sendStatus(301);
    }
  },
  createWatchList: async (req, res) => {
    const { user_id, movie_id } = req.body;
    const check = await req.app
      .get("db")
      .movie_create_watch_list(movie_id, user_id);
    if (check[0]) {
      res.status(200).send({ userLiked: true });
    } else {
      res.status(200).send({ userLiked: false });
    }
  },
  getWatchList: async (req, res) => {
    const { user_id, movie_id } = req.body;
    const check = await req.app
      .get("db")
      .movie_get_watch_list(movie_id, user_id);

    if (check[0]) {
      res.send(check[0]);
    } else {
      res.sendStatus(301);
    }
  },
  getUserState: async (req, res) => {
    const { user_id, movie_id } = req.body;
    const check = await req.app
      .get("db")
      .movie_get_user_state(movie_id, user_id);

    res.status(200).send(check);
  },
};
