const express= require('express');
const app= express();
const mongoose= require('mongoose');
const bodyparser = require('body-parser');
const users=require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//Body Parser configuration
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//first route
app.get('/', (req,res)=>res.send('Hello World'));

//Use routes
app.use('/api/users',users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port=7000;
app.listen(port, () => console.log(`Server running on port ${port}`));

//Db config(read connection string)
const db= require('./config/keys').mongoURI;

//Connect to mongodb
mongoose
  .connect(db)
  .then(()=>console.log('MongoDB Connected'))
  .catch(err=>console.log(err));