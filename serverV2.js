var express = require('express')
var app = express()
var fs = require('fs')

//Hardcoded user for add endpoint
var endpoints = [
    "list", 
    "add",
    "delete",
    "get",
]

//Hardcoded user for add endpoint
var user = {
    "user4" : {
        "name" : "mohit",
        "password" : "password4",
        "profession" : "teacher",
        "id" : 4
    }
}

var endpoint_user_list = function(req, res){
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', function(err, data){
        res.end(data)
    })    
}

var endpoint_user_add = function(req, res){
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', function(err, data){
        data = JSON.parse(data)
        data['user4'] = user['user4']
        res.end(JSON.stringify(data))
    })    
}    

var endpoint_user_get = function(req, res){
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', function(err, data){
        var users = JSON.parse(data)
        var user = users["user" + req.query.uid]
        res.end(JSON.stringify(user))
    })    
}

var endpoint_user_delete = function(req, res){
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', function(err, data){
        var data = JSON.parse(data)
        delete data["user"+2]
        res.end(JSON.stringify(data))
    })
}

endpoints.forEach(function(item, index){
    app.get('/user/'+item, function(req, res){ 
        var func = 'endpoint_user_'+item+'(req, res)'
        eval(func) 
    })
})


//Setup server on 8081
var server = app.listen(8081, function(){
    var host = server.address().address
    var port = server.address().port
    //console.log(server.address())
    console.log("Example app listening at http://%s:%s", host, port)
})