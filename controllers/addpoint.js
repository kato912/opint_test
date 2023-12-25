const User = require('../models/User');
const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

module.exports = async (req, res) => {
    try {
        const data = await readFileAsync("data.json", 'utf-8');
        const day = JSON.parse(data);
        const userData = await User.findById(req.session.userId);
        const dayandpoint = `${day.nameday}  +${day.point}`;

        if(!userData.allday.includes(dayandpoint)){
        userData.allday.push(dayandpoint);
        userData.point += parseInt(day.point);
        await userData.save();
        }
        res.redirect('/Home');
    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }
};