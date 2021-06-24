const express = require('express');
const asyncHandler = require('express-async-handler');
const { Song } = require('../../db/models');
const { restoreUser } = require('../../utils/auth');

const router = express.Router();

router.get(
  '/',
  restoreUser,
  asyncHandler(async (req, res) => {
    const { user } = req;
    const currentUserId = user.dataValues.id
    const songs = await Song.findAll({
      where: {
        userId: currentUserId
      }
    })
    return res.json({
      songs
    })
  })
)
router.get(
  '/all',
  asyncHandler(async (req, res) => {
    const songs = await Song.findAll();
    return res.json({
      songs
    })
  })
)
router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const songId = req.params.id;
    const song = await Song.findOne({
      where:{
        id: songId
      }
    })
    return res.json({
      song
    })
  })
)
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { title, songUrl, userId, albumId } = req.body;
    const song = await Song.create({
      title,
      songUrl,
      userId,
      albumId
    })
    return res.json({
      song
    })
  })
)
router.put(
  '/edit/:id(\\d+)',
  restoreUser,
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { title, songUrl, userId, albumId } = req.body;
    const song = await Song.findByPk(id);
    song.update({
      title,
      songUrl,
      userId,
      albumId
    })
    return res.json(
      song
    )
  })
)
router.delete(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const songId = req.params.id;
    const deleteSong = await Song.findByPk(songId);
    deleteSong.destroy()
    return res.json(
      deleteSong
    )
  })
)

module.exports = router;
