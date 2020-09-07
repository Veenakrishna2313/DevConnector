const express= require('express');
const router=express.Router();

//@route GET /api/profiles/test
//@desc Tests Profiles js
//@access Public

router.get('/test', (req,res) => res.json({msg:'User works'}));

module.exports=router;