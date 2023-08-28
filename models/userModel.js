const { sequelize } = require('../controllers/db');

// Define the User model
const User = sequelize.define('User', {
    googleId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    facebookId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    preferredLanguage: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

// // Function to create or link a user from Google OAuth data
// User.createFromGoogle = async function (googleUserData) {
//     const { sub, email, name } = googleUserData;
  
//     // Check if the user with this Google ID already exists
//     const existingUser = await this.findOne({ where: { googleId: sub } });
  
//     if (existingUser) {
//       // If the user exists, you can update their profile or return an error
//       return existingUser;
//     }
  
//     // Create a new user in your database using Google's unique sub (subject) identifier
//     return this.create({
//       googleId: sub,
//       username: name,
//       email: email,
//       // Set other user fields as needed
//     });
// };
  
// // Function to create or link a user from Facebook OAuth data
// User.createFromFacebook = async function (facebookUserData) {
//     const { id, email, name } = facebookUserData;

//     // Check if the user with this Facebook ID already exists
//     const existingUser = await this.findOne({ where: { facebookId: id } });

//     if (existingUser) {
//         // If the user exists, you can update their profile or return an error
//         return existingUser;
//     }

//     // Create a new user in your database using Facebook's unique id
//     return this.create({
//         facebookId: id,
//         username: name,
//         email: email,
//         // Set other user fields as needed
// });
// };

module.exports = { User };