var authModel = require('../model/regi');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
var nodeMailer = require('nodemailer');
var regi = {

    create: function (req, res) {
        console.log("within Create function");
        var regis = new authModel();

        regis.name = req.body.name;
        regis.email = req.body.email;
        regis.mob = req.body.mob;
        regis.pass = req.body.pass;
        let hash = bcrypt.hashSync(req.body.pass, 10);
        regis.pass = hash;
        regis.cpass = req.body.cpass;
        authModel.findOne({ email: regis.email }, function (err, empemail) {
            if (empemail) {

                res.status(200).json({ status: 'success', message: 'Email Present.', doc: empemail });
                console.log("Email is already present ");
            }
            if (!empemail) {
                console.log("you have to write save function here");
                regis.save(function (err, doc) {

                    if (err) {
                        res.status(200).json({ status: 'error', message: 'Datebase Error:' + err, doc: '' });
                    } else {
                        res.status(200).json({ status: 'success', message: 'Document added Successfully.', doc: doc });
                    }



                });
            }
        });
    },
    getAll: function (req, res) {
        console.log("Within in node side getALll mehtod of login");
        authModel.find({ email: req.body.email }, function (err, doc) {
            console.log("email", req.body.email);

            if (err) {
                return res.status(200).json({ status: 'error', message: 'Database error:' + err, doc: '' });
            }
            else {

                // console.log("doc", doc[0].pass);
                bcrypt.compare(req.body.pass, doc[0].pass, function (err, doc) {
                    console.log("pass", req.body.pass);
                    console.log("pass", doc);

                    if (err) {
                        console.log("errr");
                        res.status(200).json({ status: 'error', message: 'Auth unSuccessful' });
                    }
                    if (!doc) {
                        console.log("errr");
                        res.status(200).json({ status: 'error', message: 'Auth unSuccessful' });
                    } else {
                        let payload = { subject: doc.pass };
                        let token = jwt.sign(payload, 'secretkey');
                        console.log("token:", token);

                        return res.status(200).json({
                            message: 'Auth Successful',
                            token: token
                        });


                    }
                });

            }

        });
    },
    getOne: function (req, res) {
        console.log("Within in getone function node side");
        authModel.find({ email: req.body.email }, function (err, doc) {
            console.log(req.body.email);

            if (err) {
                res.status(400).json({ status: 'error', message: 'DB error' });
            }

            else {
                console.log("DOC:", doc);
                console.log("DOC:", doc[0].id);
                const encryptedString = cryptr.encrypt(doc[0].id);
                console.log("encrypted id=:", encryptedString);
                let transporter = nodeMailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: req.body.email,
                        pass: 'ygqzevxizjvmnopd'
                    }
                });
                let mailOptions = {
                    from: req.body.email, // sender address
                    to: "rekhagaware10@gmail.com", // list of receivers
                    subject: "link check", // Subject line
                    text: "some text here", // plain text body
                    html: "file:///home/am-a1/Rekha/Org-api/angularjs/index.html#!/forgot/" + encryptedString// html body
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
                    res.render('index');
                });
                res.status(200).json({ status: 'success', message: 'Email Present.', doc: doc });
            }
        })
    }
    ,
    update: function (req, res) {
        const decryptedString = cryptr.decrypt(req.params.id);
        console.log("decrepted data:", decryptedString);

        authModel.findOne({ '_id': decryptedString }, function (err, doc) {
            console.log("WITHIN UPDATE FUNCTION PUT");
            console.log("ID===>", req.params.id);

            if (err) {
                res.status(200).json({ status: 'error', message: 'Database Error:' + err, doc: '' });
            }

            var hash = bcrypt.hashSync(req.body.pass, 10);
            doc.pass = hash;

            console.log("UPDATED DOCUMENT IS:", doc.pass);

            doc.save(function (err, doc) {
                console.log("Within save");

                if (err) {
                    console.log("Within Error");
                    res.status(200).json({ status: 'error', message: 'Database Error:' + err, doc: '' });
                }
                else {
                    res.status(200).json({ status: 'success', message: 'Document updated Successfully.', doc: doc });
                    console.log("UPDATED RECORD IS", doc);

                }
            });

        });

    }
}
module.exports = regi;