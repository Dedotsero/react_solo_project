const express = require('express');
const asyncHandler = require('express-async-handler');
const { Album } = require('../../db/models');
const { restoreUser } = require('../../utils/auth');

const router = express.Router();

router.get(
  '/users/:id',
  restoreUser,
  asyncHandler(async (req, res) => {
    const currentUserId = parseInt(req.params.id)
    const albums = await Album.findAll({
      where: {
        userId: currentUserId
      }
    })
    return res.json({
      albums
    })
  })
)
router.get(
  '/all',
  asyncHandler(async (req, res) => {
    const albums = await Album.findAll();
    return res.json({
      albums
    })
  })
)
router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const albumId = parseInt(req.params.id)
    const album = await Album.findOne({
      where:{
        id: albumId
      }
    })
    return res.json({
      album
    })
  })
)
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { title, imageUrl, userId } = req.body;
    const album = await Album.create({
      title,
      imageUrl,
      userId
    })
    return res.json({
      album
    })
  })
)
router.put(
  '/edit/:id(\\d+)',
  restoreUser,
  asyncHandler(async (req, res) => {
    const albumId = req.params.id;
    const { title, imageUrl, userId } = req.body;
    const album = await Album.findByPk(albumId);
    album.update({
      title,
      imageUrl,
      userId
    })
    return res.json(
      album
    )
  })
)
router.delete(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const albumId = req.params.id;
    const deleteAlbum = await Album.findByPk(albumId);
    deleteAlbum.destroy()
    return res.json(
      deleteAlbum
    )
  })
)

module.exports = router;
