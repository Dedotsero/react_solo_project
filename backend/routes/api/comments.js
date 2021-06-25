const express = require('express');
const asyncHandler = require('express-async-handler');
const { Comment } = require('../../db/models');
const { restoreUser } = require('../../utils/auth');

const router = express.Router();

router.get(
  '/all',
  asyncHandler(async (req, res) => {
    const comments = await Comment.findAll();
    return res.json({
      comments,
    })
  })
)
router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const commentId = parseInt(req.params.id)
    const comment = await Comment.findOne({
      where:{
        id: commentId
      }
    })
    return res.json({
      comment
    })
  })
)
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { content, songId, userId } = req.body;
    const comment = await Comment.create({
      content,
      songId,
      userId
    })
    return res.json({
      comment
    })
  })
)
router.put(
  '/edit/:id(\\d+)',
  restoreUser,
  asyncHandler(async (req, res) => {
    const commentId = req.params.id;
    const { content, songId, userId } = req.body;
    const comment = await Comment.findByPk(commentId);
    album.update({
      content,
      songId,
      userId
    })
    return res.json(
      comment
    )
  })
)
router.delete(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const commentId = req.params.id;
    const deleteComment = await Comment.findByPk(commentId);
    deleteComment.destroy()
    return res.json(
      deleteComment
    )
  })
)

module.exports = router;
