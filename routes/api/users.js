const express= require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const gravatar= require('gravatar');
const User=require('../../models/User');

//@route GET /api/users/test
//@desc Tests users js
//@access Public

router.get('/test', (req,res) => res.json({msg:'User works'}));

//@route POST /api/users/register
//@desc Tests users js
//@access Public

router.post('/register', (req,res)=>{
User.findOne({email:req.body.email})
  .then(user =>{
    if(user){
      return res.status(400).json({email:'EMail already exists'});
    }else{
    const avatar=  gravatar.url(req.body.email,{
        s:'200',
        r:'PG'
      });      

      const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        avatar,
        password:req.body.password
      });

      bcrypt.genSalt(10,(err,salt)=> {
        if(err) throw err;
        bcrypt.hash(newUser.password,salt,(err,hash)=>
        {
          if(err)throw err;
          newUser.password=hash;
          newUser.save()
            .then(user=>res.json(user))
            .catch(err =>console.log(err))
        })
      });
    }
  })
  .catch();
});

module.exports=router;