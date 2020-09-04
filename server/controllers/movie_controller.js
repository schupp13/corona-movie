module.exports = {
  createFavorite: async (req, res) => {
    const { user_id, movie_id } = req.body;
    const check = await req.app
      .get("db")
      .movie_create_favorite(movie_id, user_id);
    console.log(check);

    if (check[0]) {
      res.status(200).send({ userLiked: true });
    } else {
      res.status(200).send({ userLiked: false });
    }
    console.log(user_id);
  },
  getFavorite: async (req, res) => {
    const { user_id, movie_id } = req.body;
    console.log(user_id + "=user_id, " + movie_id + "=movie_id");
    const check = await req.app.get("db").movie_get_favorite(movie_id, user_id);

    if (check[0]) {
      res.send(check[0]);
    } else {
      res.sendStatus(301);
    }
  },
};
