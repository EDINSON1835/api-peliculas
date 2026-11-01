const { Router } = require('express');
const crudRouter = require('./crudRouter');
const catalogos = require('../controllers/catalogos');
const media = require('../controllers/media');

const router = Router();

router.use('/generos', crudRouter(catalogos.generos));
router.use('/directores', crudRouter(catalogos.directores));
router.use('/productoras', crudRouter(catalogos.productoras));
router.use('/tipos', crudRouter(catalogos.tipos));
router.use('/media', crudRouter(media));

module.exports = router;
