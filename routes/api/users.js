const express= require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const gravatar= require('gravatar');
const jwt = require('jsonwebtoken');
const passport= require('passport');
const User=require('../../models/User');
const keys=require('../../config/keys');

//@route POST /api/users/register
//@desc Tests users js
//@access Public

router.post('/register', (req,res)=>{
User.findOne({email:req.body.email})
  .then(user =>{
    if(user){
      return res.status(400).json({email:'Email already exists'});
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


//@route POST /api/users/register
//@desc Tests users js
//@access Public

router.post('/login',(req,res)=>{

  const email=req.body.email;
  const password=req.body.password;

  //Find user with email

  User.findOne({email})
  .then(user=> {
    if(!user){
      return res.status(404).json({ email: 'User not Found' });
     }

     //check password
bcrypt.compare(password,user.password)
     .then(isMatch =>{

      if(isMatch){
        //User Matched
       const payload={id:user.id, name:user.name, avatar:user.avatar};

        //sign Token

        jwt.sign(
          payload,
           keys.secretOrKey,
           {  expiresIn:3600 }, (err,token)=>{return res.json({token:'Bearer '+ token})
        });  
      }
      else{

        return res.status(404).json({ password: 'Password incorrect' });
      }
     })
     .catch(err=>console.log(err));

  })
    .catch(err => console.log(err));
})

//@route GET /api/users/current
//@desc Return current user info
//@access Private

router.get('/current',
  passport.authenticate('jwt', {session:false}),
  (req,res)=>{

   return res.json(req.user);

})

module.exports=router;