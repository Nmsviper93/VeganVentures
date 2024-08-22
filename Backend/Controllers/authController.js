const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/modelsUser');

// Controller function to handle user registration
// exports.registerUser = async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         // check if user already exists
//         let user = await User.findOne({ username });
//         if (user) {
//             return res.status(400).json({ msg: 'User already exists'});
//         }

//         user = new User({ username, password });

//         // generate a salt and hash the password
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(password, salt);

//         // save user to database
//         await user.save();

//         // create payload with user id
//         const payload = { user: { id: user.id, }, };

//         // sign a JSON Web Token and send it in the response
//         jwt.sign(
//             payload,
//             // use secret from .env file
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' },
//             (err, token) => {
//                 if (err) throw err;
//                 res.json({ token });
//             }
//         );
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };

// Controller function to handle user login
// exports.loginUser = async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         // check if user exists
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(400).json({ msg: 'Invalid credentials' });
//         }

//         // compare provided password with hashed password in database
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ msg: 'Invalid credentials '});
//         }

//         const payload = { user: { id: user.id, }, };

//         // sign JWT and send in response
//         jwt.sign(
//             payload,
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' },
//             (err, token) => {
//                 if (err) throw err;
//                 res.json({ token });
//             }
//         );
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }

//     exports.checkStatus = (req, res) => {
//         res.json({ isAuthenticated: true });
//     };
