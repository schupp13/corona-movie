module.exports = {
  createFavorite: async (req, res) => {
    const { user_id, tvshow_id } = req.body;
    const check = await req.app
      .get("db")
      .tvshow_create_favorite(tvshow_id, user_id);
    console.log(check);

    if (check[0]) {
      res.status(200).send({ userLiked: true });
    } else {
      res.status(200).send({ userLiked: false });
    }
  },
  getFavorite: async (req, res) => {
    const { user_id, tvshow_id } = req.body;
    const check = await req.app
      .get("db")
      .tvshow_get_favorite(tvshow_id, user_id);

    if (check[0]) {
      res.send(check[0]);
    } else {
      res.sendStatus(301);
    }
  },
};
