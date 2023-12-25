const fs = require('fs');
const User = require('../models/User');

module.exports = async (req,res,next) =>{
    const userData = await User.findById(req.session.userId);
    const allday = {
        ID: 0,
        nameday: 0,
        point: 0
    }
    const dayJson = JSON.stringify(allday)
    fs.writeFile("data.json",dayJson, async (error)=>{
        if(error){
            console.error(error);
            throw err;
        }
        userData.haveqr = false;
        await userData.save();
        console.log('suusssdusdad');
        next();
    })
}