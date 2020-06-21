const hashMethod = require('../utils/hash');
const generateAuthToken = require('../utils/authToken')
const jsonfile = require('jsonfile');
const path = require('path');
const Student = require('../models/studentsModel');
const Admin = require('../models/adminModel')

let authStudent = {}


exports.getLogin = (req,res,next) => {
    //TODO Render the student login page here
    res.send('Student Login Page')
}

exports.getRegister = () => {
    //TODO Render the student Registration Page Here
    res.send('Register Page')
}

exports.postRegister = () => {
    if(req.body) {
        Student.register(req.body)
        res.json('student registered') 
    }else {
        res.send('No data')
    }
        
}

exports.postLogin = (req,res,next) => {
    var isStudent =  Student.validStudent(req.body.email,req.body.password);
    if(isStudent){
        // console.log('admin is valid')
        const token = generateAuthToken();
        // console.log('Auth Token',token)
        let email = req.body.email;
        let password = req.body.password;
        // const authToken = generateAuthToken;
        authStudent[token] = {email, password};
        jsonfile.writeFile(path.join(__dirname,'../','db/authStudent.json'), authStudent)
        .then(res => {
            console.log('update complete')
        })
        .catch(error => console.error(error))
        console.log(authStudent);

        res.cookie('authtoken',token);
        //Student Sucessfully Loged In
        res.render('login')
    }else {
        res.render('home')
    }
}

