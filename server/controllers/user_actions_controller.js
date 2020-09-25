module.exports = {
  createFav: (req, res) => {
    // this function is used to creeate or delete a record in the favorites table... works like a toggle
    const { user_id, item_id, media_id } = req.body;
    req.app
      .get("db")
      .favorites_create(item_id, user_id, media_id)
      .then((data) => {
        console.log(data);

        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send([]);
      });
  },
  createWatch: (req, res) => {
    // this function is used to creeate or delete a record in the favorites table... works like a toggle
    const { user_id, item_id, media_id } = req.body;
    req.app
      .get("db")
      .watchlist_create(item_id, user_id, media_id)
      .then((data) => {
        console.log(data);

        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send([]);
      });
  },

  userState: async (req, res) => {
    // this function is used to creeate or delete a record in the favorites table... works like a toggle
    const { user_id, item_id, media_id } = req.body;

    let data = await req.app
      .get("db")
      .get_user_state(item_id, user_id, media_id);
    if (data.length === 2) {
      res.status(200).send({ userLiked: true, userWatchlist: true });
    } else if (data.length === 0) {
      res.status(200).send({ userLiked: false, userWatchlist: false });
    } else if (data.length === 1) {
      if (data[0]["?column?"] === "userLiked") {
        res.status(200).send({ userLiked: true, userWatchlist: false });
      } else {
        res.status(200).send({ userLiked: false, userWatchlist: true });
      }
    }
    // req.app
    //   .get("db")
    //   .get_user_state(item_id, user_id, media_id)
    //   .then((data) => {
    //     res.status(200).send(data);
    //   })
    //   .catch((error) => {
    //     res.status(400).send([]);
    //   });
  },
};
