var path = require('path')
var express = require('express');
const exphbs = require("express-handlebars"); 
const cookieParser = require('cookie-parser')
const jsonfile = require('jsonfile')

const app  = express();

const adminRouter =  require('./routes/adminRouter')
const studentRouter = require('./routes/studentRouter')
const regularRouter = require('./routes/regularRouter')

const fs = require('fs')

let authUsers = {}
let authStudents = {}

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(cookieParser())

app.engine('handlebars',exphbs());
app.set('view engine','handlebars');
app.set('views','views')

// Creating the online user cookie files

app.use(regularRouter)

app.use('/admin',(req,res,next) =>{
    // console.log('Checking cookies');
    let token = req.cookies['authtoken'];
    console.log('The token: '+ token);
    authUsers =  jsonfile.readFileSync(path.join(__dirname,'/db/authUsers.json'))
  
    req.user = authUsers[token];
    next();
})

        
app.use('/admin', adminRouter)

app.use('/students',() => {
    // console.log('Checking cookies');
    let token = req.cookies['authtoken'];
    authStudents =  jsonfile.readFileSync(path.join(__dirname,'/db/authStudents.json'))
    req.user = authStudents[token];
    next();
})



app.use('/students',studentRouter)

app.listen(6080,()=>{
    console.log(`server started in http://localhost:6080`);
})

