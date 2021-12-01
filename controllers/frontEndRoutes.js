const express = require('express');
const router = express.Router();
const { Blog,User, Comment } = require('../models');

router.get("/",(req,res)=>{
    Blog.findAll({
        order:["id"],
        include:[User]
    }).then(blogData=>{
        const hbsblogs = blogData.map(blog=>blog.get({plain:true}))
        res.render("homepage",{
            blogs:hbsblogs
        })
    })
})

router.get("/profile",(req,res)=>{
    if(!req.session.user){
        return res.status(401).render("no")
    }
    User.findByPk(req.session.user.id,{
        include:[Blog]
    }).then(userData=>{
        const hbsUser = userData.get({plain:true});
        res.render("profile",hbsUser)
    })
})

router.get("/blogs/:id", async(req,res)=>{
    try {
        const dbBlogData = await Blog.findByPk(req.params.id, {
            include:[User,Comment]
        });
        const blog = dbBlogData.get({ plain: true });
    
        res.render('blog', { blog });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
})

router.get("/comments/:id", async(req,res)=>{
    try {
        const dbCommentData = await Comment.findByPk(req.params.id, {
            include:[Blog]
        });
        const comment = dbCommentData.get({ plain: true });
    
        res.render('comment', { comment });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
})

router.get("/signin",(req,res)=>{
    res.render("signin")
})

router.get("/signup",(req,res)=>{
    res.render("signup")
})

module.exports = router;