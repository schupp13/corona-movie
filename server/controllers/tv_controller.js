module.exports = {
  createFavorite: async (req, res) => {
    const { user_id, tvshow_id } = req.body;
    const check = await req.app
      .get("db")
      .tvshow_create_favorite(tvshow_id, user_id);
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
  createWatchList: async (req, res) => {
    const { user_id, tvshow_id } = req.body;
    const check = await req.app
      .get("db")
      .tvshow_create_watch_list(tvshow_id, user_id);
    if (check[0]) {
      res.status(200).send({ userLiked: true });
    } else {
      res.status(200).send({ userLiked: false });
    }
  },
  getWatchList: async (req, res) => {
    const { user_id, tvshow_id } = req.body;
    const check = await req.app
      .get("db")
      .tvshow_get_watch_list(tvshow_id, user_id);

    if (check[0]) {
      res.send(check[0]);
    } else {
      res.sendStatus(301);
    }
  },
  getUserState: async (req, res) => {
    console.log("hit");
    const { user_id, tvshow_id } = req.body;
    console.log(tvshow_id);
    const check = await req.app
      .get("db")
      .tvshow_get_user_state(tvshow_id, user_id);

    console.log(check);
    res.status(200).send(check);
  },
};
