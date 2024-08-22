// import React, { useState } from 'react';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom';
// import '../styles/RegisterPage.css';

// const RegisterPage = () => {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [error, setError] = useState('');
//     const history = useHistory();

//     const validateForm = () => {
//         if (!username || username.length < 3) {
//             setError('Username is required and must be at least 3 characters');
//             return false;
//         }
//         if (!email || !/\S+@\S+\.\S+/.test(email)) {
//             setError('Valid email is required');
//             return false;
//         }
//         if (!password || password.length < 6) {
//             setError('Password is required and must be at least 6 characters');
//             return false;
//         }
//         if (password !== confirmPassword) {
//             setError('Passwords do not match');
//             return false;
//         }
//         return true;
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         if (!validateForm()) return;

//         try {
//             await axios.post('/api/users/register', { username, email, password });
//             history.push('/login');
//         } catch (error) {
//             setError('Registration failed. Please try again');
//         }
//     };

//     return (
//         <div className="container">
//             <h1>Register</h1>
//             {error && <p className="error">{error}</p>}
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Username</label>
//                     <input 
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label>Email</label>
//                     <input 
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label>Password</label>
//                     <input 
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label>Confirm Password</label>
//                     <input 
//                         type="password"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                     />
//                 </div>
//                 <button type="submit" className="button">Register</button>
//             </form>
//         </div>
//     );
// };

// export default RegisterPage;
