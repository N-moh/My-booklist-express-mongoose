const express = require('express');
const router = express.Router();
const books = require('./bookController')

router.put('/book/:id',books.update)
router.delete('/book/:id',books.delete)
router.get('/booklist', books.index)
router.post('/book/create',books.create)
router.get('/book/:id',books.show)
router.get ('/book/bytitle/:title',books.byTitle)
router.get ('/book/byauthor/:author',books.byAuthor)

module.exports = router;

