const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const bcrypt = require('bcryptjs');



exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    // Register a new user
    try {
        let user = await User.findOne({ email });

        if(user){
            return res.status(400).json({ msg: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword  = await bcrypt.hash(password, salt);

        user = new User({
            username,
            email,
            password: hashedPassword
        });



        await user.save();
        const payload = ({
            user:{
                id: user.id
            }
        });

        jwt.sign(payload, process.env.JWT_SECRET,(err, token) =>{
            if(err) throw err;
            res.json({ token });
        });
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    // Login user
    try{
        let user = await User.findOne({ email })

        if(!user){
            return res.status(401).send('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).send('Invalid password')
        }
        
        const payload = ({
            user: {
                id: user._id
            }
        });

        jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
            if(err) throw err;
            res.json({ token });
        });
    }catch(err){
        console.error(err.message);
    }
};
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};