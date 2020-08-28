const bcrypt = require("bcryptjs");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    if (!username || !password) {
      res.status(406).json({
        error: "Please fill in all information",
      });
    } else {
      if (username === "Parker" && password === "Password") {
        let user = {
          username: "Parker",
          firstname: "Parker",
          lastname: "Schultz",
        };
        req.session.user = {
          ...user,
        };
        res.status(200).send(req.session.user);
      } else {
        res.status(406).json({
          error: "Username or password is incorrect",
        });
      }
    }
  },
  //   getSession: (req, res) => {
  //     req.session.user ? res.json(req.session.user) : res.sendStatus(403);
  //   },
  //   logout: (req, res) => {
  //     console.log(req.session);
  //     req.session.destroy();
  //     res.sendStatus(200);
  //   },
};
