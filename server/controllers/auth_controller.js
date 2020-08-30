const bcrypt = require("bcryptjs");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(406).json({
        error: "Please fill in all information",
      });
    } else {
      const getUser = await req.app.get("db").auth_username(username);
      if (getUser[0]) {
        const access = await bcrypt
          .compare(password, getUser[0].user_password)
          .catch((err) => console.log(err));
        if (!access) {
          res.sendStatus(403);
        } else {
          req.session.user = {
            ...getUser[0],
            ad: [],
          };
          delete req.session.user.user_password;
          res.status(200).send(req.session.user);
        }
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
  register: async (req, res) => {
    let { password, email, username } = req.body;
    console.log(req.body);
    const hash = await bcrypt
      .hash(password, 10)
      .catch((err) => console.log(err));
    console.log(hash);
    const user = await req.app.get("db").registration_check(email, username);
    if (!username || !password || !email) {
      res.status(406).json({
        error: "Please fill in all information",
      });
    } else if (user[0]) {
      res.status(406).json({
        error: "Username or Email already exist",
      });
    } else {
      const user = await req.app.get("db").create_user(email, username, hash);
      if (user[0]) {
        req.session.user = {
          ...user[0],
        };
        res.status(200).send(req.session.user);
      }
    }
  },
  //   logout: (req, res) => {
  //     console.log(req.session);
  //     req.session.destroy();
  //     res.sendStatus(200);
  //   },
};
