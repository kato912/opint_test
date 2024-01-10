const User = require('../models/User');
module.exports = async (req,res,next) =>{
    let UserData = await User.findById(req.session.userId)
    if (!UserData.Admin){
        return  res.redirect('/');
    }
    else{
        if(!UserData.haveqr){
            next()
        }
    else {
        return  res.redirect('/adminn');
    } 
    }
}