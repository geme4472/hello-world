var express = require('express')
var app = express()
var fs = require('fs')

//List user endpoint
app.get('/listUsers', function(req, res){
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', function(err, data){
        console.log(data)
        res.end(data)
    })
})

//Hardcoded user for add endpoint
var user = {
    "user4" : {
        "name" : "mohit",
        "password" : "password4",
        "profession" : "teacher",
        "id" : 4
    }
}

//Add user endpoint
app.post('/addUser', function (req, res){
    //First read existing users
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', function(err, data){
        data = JSON.parse(data)
        data['user4'] = user['user4']
        console.log(data)
        res.end(JSON.stringify(data))
    })    
})

//Get Single User Endpoint (modified URI for clarity)
app.get('/getUserByID/:id', function(req, res){
    //First read again
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', function(err, data){
        var users = JSON.parse(data)
        var user = users["user" + req.params.id]
        console.log(user)
        res.end(JSON.stringify(user))
    })
})

//Error: this variable not used. 2 is hardcoded in line 53, per the PPT details.
var id = 2;

//Delete user
app.delete('/deleteUser', function(req, res){
    //First read
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', function(err, data){
        var data = JSON.parse(data)
        delete data["user"+2]
        console.log(data)
        res.end(JSON.stringify(data))
    })
})

var server = app.listen(8081, function(){
    var host = server.address().address
    var port = server.address().port
    //console.log(server.address())
    console.log("Example app listening at http://%s:%s", host, port)
})