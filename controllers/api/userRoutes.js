const router = require("express").Router();
const { User } = require("../../models");

router.get("/", (req, res) => {
  User.findAll({
    include: [Blog],
  })
    .then((dbUsers) => {
      if (dbUsers.length) {
        res.json(dbUsers);
      } else {
        res.status(404).json({ message: "User not found!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "an error occured", err: err });
    });
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((foundUser) => {
      if (!foundUser) {
        req.session.destroy();
        res.status(401).json({ message: "incorrect email or password" });
      } else {
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
          req.session.user = {
            name: foundUser.name,
            email: foundUser.email,
            id: foundUser.id,
          };
          res.json(foundUser);
        } else {
          res.status(401).json({ message: "incorrect email or password" });
          req.session.destroy();
        }
        req.session.save(() => {
          req.session.user_id = foundUser.id;
          req.session.logged_in = true;

          res.json({ user: userData, message: "You are now logged in!" });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/signup", (req, res) => {
  User.create({
    name: req.body.name,
    password: req.body.password,
  }).then((newUser) => {
    //res.json(newUser);
    req.session.save(() => {
      req.session.user = newUser;
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.json({ user: newUser, message: "You are now logged in!" });
    })
  })    
  .catch((err) => {
    console.log(err);
    res.status(500).json({ message: "an error occured", err: err });
  });
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  }).then((delUser) => {
    res.json(delUser);
  });
});

module.exports = router;
