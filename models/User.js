const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email:{
        type: String,
        required: [true , 'Please provide email']
    },
    Name:{
        type: String,
        required: [true , 'Please provide name']
    },
    LastName:{
        type: String,
        required: [true , 'Please provide lastname']
    },
    // Class:{
    //     type: String,
    //     required: [true]
    // },
    // room:{
    //     type: String,
    //     required: [true]
    // },
    // StudentID:{
    //     type: String
    // },
    password:{
        type: String,
        required: [true , 'Please provide password']
    },
    point:{
        type: Number
    },
    allday:{
        type: Array
    },
    Admin:{
        type: Boolean
    },
    haveqr:{
        type: Boolean
    },
    avata:{
        type: String
    }
})

UserSchema.pre('save', async function (next) {
    const user = this;
    if (this.isNew) {
        this.haveqr = false;
        this.Admin = false;
        this.allday = ['0  +0'];
        this.point = 0;
        this.avata = '../public/img/pofileUser_img/nopofile.png'
    }
    try {
        if (user.isModified('password') || user.isNew) {
            const hash = await bcrypt.hash(user.password, 10);
            user.password = hash;
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
    next();
});

const User = mongoose.model('User',UserSchema);
module.exports = User;