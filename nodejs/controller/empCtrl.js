var empModel = require('../model/emp');

var emp = {
    create: function (req, res) {
        console.log("within craete function");
        console.log('Request File:', req.file);
        console.log('Request body:', req.body);
        console.log("TTTTTTTTTTTTTTTTTT::::", req.body.result);
        var employee = new empModel();
        employee.fname = req.body.fname;
        employee.lname = req.body.lname;
        console.log("emp details:", employee.fname, employee.lname);
        employee.email = req.body.email;

        employee.mob = req.body.mob;

        console.log("mobile length-----------:", employee.mob.length);
        console.log("date of birth==>", req.body.dob);
        var date = new Date(req.body.dob);
        var dob = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
        console.log("DOB=====>", dob);
        employee.dob = dob;
        employee.addr = req.body.addr;
        employee.state = req.body.state;
        employee.city = req.body.city;
        employee.zip = req.body.zip;
        employee.gender = req.body.gender;

        employee.hobbies = req.body.hobbies;
        employee.skills = req.body.skills;
        employee.salary = req.body.salary;
        if (req.file !== undefined) {
            employee.myImg = req.file.filename;
        }
        else {
            employee.myImg = "";
            console.log("within else bock image is undefine");
        }
        console.log("EMP FILE:", employee.myImg);
        employee.save(function (err, doc) {
            if (err) {
                res.status(200).json({ status: 'error', message: 'Datebase Error:' + err, doc: '' });
            }
            else {

                res.status(200).json({ status: 'success', message: 'Document added Successfully.', doc: doc });
                console.log("DOCUMENTS+++++++++++++", doc.myImg);
                console.log("dETAILS OF DOCUMENTS:", doc);


            }
        })
    },
    getAllEmp: function (req, res) {
        //---for perticular news id get data---//
        console.log("within getAll methood");
        empModel.find(function (err, doc) {
            if (err) {
                res.status(200).json({ status: 'error', message: 'Database error:' + err, doc: '' });
            }
            else {
                res.status(200).json({ status: 'success', message: 'success', doc: doc });
                // console.log("Doc:", doc);
            }
        });
    },
    getOneEmp: function (req, res) {
        empModel.findById(req.params.id, function (err, doc) {
            if (err) {
                res.status(200).json({ status: 'error', message: 'id error in database' + err, doc: '' });
            }
            else {
                res.status(200).json({ status: 'success', message: 'success', doc: doc });

            }
        });
    },
    update: function (req, res) {
        empModel.findById(req.params.id, function (err, doc) {
            console.log("WITHIN UPDATE FUNCTION PUT");
            console.log("ID===>", req.params.id);
            if (err) {
                res.status(200).json({ status: 'error', message: 'Database Error:' + err, doc: '' });
            }
            console.log("fname", doc.fname);
            doc.fname = req.body.fname;
            doc.lname = req.body.lname;
            doc.email = req.body.email;
            doc.mob = req.body.mob;
            doc.dob = req.body.dob;
            doc.addr = req.body.addr;
            doc.state = req.body.state;
            doc.city = req.body.city;
            doc.zip = req.body.zip;
            doc.gender = req.body.gender;
            doc.hobbies = req.body.hobbies;
            doc.skills = req.body.skills;
            doc.salary = req.body.salary;
            console.log("UPDATED DOCUMENT IS:", doc.fname);
            console.log("file name:", doc.myImg);
            if (req.file !== undefined) {
                doc.myImg = req.file.filename;
            }
            else {
                doc.myImg = "";
                console.log("within else bock image is undefine");
            }
            console.log("EMP FILE:", doc.myImg);
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

    },

    delete: function (req, res) {
        empModel.deleteOne({ _id: req.params.id }, function (err, doc) {
            console.log("Within deleteone", req.params.id);


            if (err) {
                res.status(200).json({ status: 'error', message: 'Database Error:' + err, doc: '' });
            }
            else {
                res.status(200).json({ status: 'success', message: 'Document deleted Successfully.', doc: '' });
                console.log("document deleted Successfully");

            }

        });
    }
}
module.exports = emp;