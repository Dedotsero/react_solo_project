// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const albumsRouter = require('./albums.js');
const songsRouter = require('./songs.js');
const commentsRouter = require('./comments.js')

router.use('/session', sessionRouter)
router.use('/users', usersRouter)
router.use('/albums', albumsRouter)
router.use('/songs', songsRouter)
router.use('/comments', commentsRouter)

module.exports = router;
