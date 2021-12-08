const express = require("express");
const router = express.Router();
const { Blog, User, Comment } = require("../models");

router.get("/", (req, res) => {
  Blog.findAll({
    order: ["id"],
    include: [User],
  }).then((blogData) => {
    const hbsblogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render("homepage", {
      blogs: hbsblogs,
    });
  });
});

router.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.status(401).render("login");
  }
  console.log(req.session.user);
  Blog.findAll({
    where: { user_id: req.session.user.id },
  })
    .then((dbBlogData) => {
        console.log(dbBlogData)
      const hbsUser = dbBlogData.map((blog) => blog.get({ plain: true }));
      res.render("dashboard", hbsUser);
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
    console.log(blog);
    res.render("blog", { blog });
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

module.exports = router;
