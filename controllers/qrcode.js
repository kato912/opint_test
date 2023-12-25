const fs = require('fs');
const User = require('../models/User');

module.exports = async (req,res,next) =>{
    const userData = await User.findById(req.session.userId);
    const {day,Pnum} = req.body;
    const allday = {
        ID: day,
        nameday: day,
        point: Pnum
    }
    const dayJson = JSON.stringify(allday)
    fs.writeFile("data.json",dayJson, async (error)=>{
        if(error){
            console.error(error);
            throw err;
        }
        userData.haveqr = true;
        await userData.save();
        console.log('suusssdusdad');
        next();
    })

}