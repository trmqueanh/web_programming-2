const express = require('express'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
Task = require('./api/models/todoListModels'),
bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://anhtmqgcs220564:queanh123@fgwweb02.yyiqneu.mongodb.net/?retryWrites=true&w=majority&appName=FGWWeb02');

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

const routes = require('./api/routes/todoListRoutes');
routes(app); 

app.listen(port);

console.log('todo lisr RESTful API server started on:' + port);