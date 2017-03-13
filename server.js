var express = require("express"); //npm install express
var app = express();

var mysql = require("mysql");//npm install mysql
var bodyparser = require("body-parser");//npm install bodyParser

/********************************************************************
Database;
'CREATE TABLE `employees` (`employeeNumber` int(11) NOT NULL,
                            `lastName` varchar(50) NOT NULL,
                            `firstName` varchar(50) NOT NULL,
                            `extension` varchar(10) NOT NULL, 
                            `email` varchar(100) NOT NULL,
                            `officeCode` varchar(10) NOT NULL,
                            `reportsTo` int(11) DEFAULT NULL,
                            `jobTitle` varchar(50) NOT NULL,
                            PRIMARY KEY (`employeeNumber`),
                            KEY `reportsTo` (`reportsTo`),
                            KEY `officeCode` (`officeCode`),
                            CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`reportsTo`) 
                            REFERENCES `employees` (`employeeNumber`)) 
                            ENGINE=InnoDB DEFAULT CHARSET=latin1';
*********************************************************************/


var con = mysql.createConnection({
    host: "<HOST-IP>",
    user: "<USER>",
    password: "<PASSWORD>",
    database: "<DATABASE>"
});

app.use(express.static(__dirname + '/'));
app.use(bodyparser.json());
//app.use(bodyparser.json({ type: 'application/vnd.api+json' }));


app.get("/employees", function(req, res){
    console.log("ok......");
    con.query("SELECT * FROM employees", function(error, rows, fields){
        if(!error)
            res.json(rows);
        else
            console.log("Fack" + error);
    });

});


app.get("/", function(req, res){
            res.sendFile("employees.html", { root : __dirname});
});




app.post("/updateEmployee", function(request, response) {
    console.log("/updateEmployee");
    console.log(request.body.firstName);
    console.log(request.body.lastName);
    console.log(request.body.employeeNumber);
    con.query("UPDATE employees SET FirstName='"+request.body.firstName+"' WHERE employeeNumber="+request.body.employeeNumber, function(error, rows, fields){
        if(!error) {
            console.log(request.body.employeeNumber + " updated")
        }
        else
            console.log("Fack" + error);
    });
});

app.listen(4000);