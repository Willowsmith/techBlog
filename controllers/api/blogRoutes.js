const router = require('express').Router();
const { Blog, User, Comment} = require('../../models');


// find all blogs
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [User, Comment],
    });
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find blog by 'id' value
router.get('/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [User, Comment],
    });

    if (!blogData) {
      res.status(404).json({ message: 'no blog found' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new blog
router.post('/', async (req, res) => {
  try {
    const blogData = await Blog.create({
      name: req.body.name,
      description: req.body.description,
      user_id: req.session.user.id
    })
    res.status(200).json(blogData)
  } catch(err) {
      console.log(err);
      res.status(400).json({ message: "error occured", err: err });
    };
});


// update blog by `id` value
router.put('/:id', async (req, res) => {
  try {
    console.log(req.body)
    const blogData = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!blogData[0]) {
      res.status(404).json({ message: 'no blog found' });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete blog by `id` value
router.delete('/:id', async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!blogData) {
      res.status(404).json({ message: 'no blog found' });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;