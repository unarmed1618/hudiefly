'use strict';

var express = require('express');
var controller = require('./category.controller');
import auth from '../../auth/auth.service';

var router = express.Router();

router.get('/menuitems',controller.menuitems);
router.get('/', controller.index);
router.get('/:id', controller.show);

router.post('/',auth.hasRole('admin'), controller.create);
router.put('/:id',auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'),controller.update);
router.delete('/:id',auth.hasRole('admin'), controller.destroy);

module.exports = router;
