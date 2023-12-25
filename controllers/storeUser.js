const User = require('../models/User')

module.exports = (req, res)=>{
    User.create(req.body).then(() => {
        console.log('User registered successfully')
        res.redirect('/');
    }).catch((error)=>{
        console.log(error)
        if(error){
            const validationErrors = Object.keys(error.errors).map(key =>error.errors[key].message);
            req.flash('validationErrors',validationErrors);
            return res.redirect('/register');
        }
    })
}