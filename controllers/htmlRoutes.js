const express = require("express");
const router = express.Router();
const { Blog, User, Comment } = require("../models");

router.get("/", (req, res) => {
  Blog.findAll({
    order: ["id"],
    include: [User],
  }).then((blogData) => {
    const hbsblogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log("this is logged_in test " + req.session.logged_in)
    res.render("homepage", {
      blogs: hbsblogs,
      logged_in: req.session.logged_in,
    });
  });
});

router.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.status(401).render("login");
  }
  Blog.findAll({
    where: { user_id: req.session.user.id },
  })
    .then((dbBlogData) => {
      const hbsUser = dbBlogData.map((blog) => blog.get({ plain: true }));
      console.log("hbsUser is: " + hbsUser)
      res.render("dashboard", {
        blogs: hbsUser,
        user: req.session.user.name,
        logged_in: req.session.logged_in,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/blogs/:id", async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id, {
      include: [User, Comment],
    });
    const blog = dbBlogData.get({ plain: true });
    res.render("blog", { blog });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// change blog by 'id' value
router.get("/blogs/changeBlog/:id", async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id, {
      include: [User],
      where: {
        name: req.body.username,
      },
    });
    const changeBlog = dbBlogData.get({ plain: true });
    console.log(changeBlog);
    res.render("changeBlog", { changeBlog });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/comments/:id", async (req, res) => {
  try {
    const dbCommentData = await Comment.findByPk(req.params.id, {
      include: [Blog],
    });
    const comment = dbCommentData.get({ plain: true });

    res.render("comment", { comment });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/logout", (req, res) => {
  res.render("logout");
  if (req.session.user) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
});

module.exports = router;
