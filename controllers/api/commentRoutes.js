const router = require('express').Router();
const { Comment, Blog, User} = require('../../models');


// find all comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [Blog],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// fidn comment by `id` value
router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [Blog],
    });

    if (!commentData) {
      res.status(404).json({ message: 'no comment found' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new comment
router.post('/', async (req, res) => {
  try {
    const commentData = await Comment.create({
      name: req.session.user.name,
      description: req.body.description,
      blog_id: req.body.blogid
    })
    res.status(200).json(commentData)
    console.log('it worked')
  } catch(err) {
      console.log(err);
      res.status(400).json({ message: "error occured", err: err });
    };
});

// update comment by `id` value
router.put('/:id', async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!commentData[0]) {
      res.status(404).json({ message: 'no comment found' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete comment by `id` value
router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: 'no comment found' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;