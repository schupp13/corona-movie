const bcrypt = require("bcryptjs");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(406).json({
        error: "Please fill in all information",
      });
    } else {
      const user = await req.app.get("db").auth_check(username, password);
      if (user[0]) {
        req.session.user = {
          ...user[0],
        };
        delete req.session.user.user_password;
        console.log(req.session.user);
        res.status(200).send(req.session.user);
      } else {
        res.status(406).json({
          error: "Username or password is incorrect",
        });
      }
    }
  },
  getSession: (req, res) => {
    req.session.user ? res.json(req.session.user) : res.sendStatus(403);
  },
  //   logout: (req, res) => {
  //     console.log(req.session);
  //     req.session.destroy();
  //     res.sendStatus(200);
  //   },
};
