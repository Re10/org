//include express,router,news,comments files
var express = require('express');
var router = express.Router();
var emp = require('./controller/empCtrl');
var regi = require('./controller/auth');
//==use Multer For image upload==//
var multer = require("multer");


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
        console.log("file original name:", file.originalname);
    }
});

var upload = multer({ storage: storage }).single('file');


router.get('/emp/:id', emp.getOneEmp);

router.get('/emp/', emp.getAllEmp);
router.put('/emp/:id', upload, emp.update);
router.post('/emp/', upload, emp.create);
router.delete('/emp/:id', emp.delete);

router.post('/regi/', regi.create);
router.post('/regies/:id', regi.getAll);
router.post('/for/', regi.getOne);
router.put('/regi/:id', regi.update);
module.exports = router;