const { User } = require('../models/userModel');

User.findOrCreateByGoogleId = async function (googleId, userData) {
    const [user, created] = await this.findOrCreate({
        where: { email: userData.email },
        defaults: {
            googleId,
            username: userData.displayName,
            email: userData.email,
        }
    });
    if (!created) {
        await this.update({ googleId }, {
            where: {
                email: userData.email
            }
        });
    }
    return { user, created };
};

User.findOrCreateByGithubId = async function (githubId, userData) {
    const [user, created] = await this.findOrCreate({
        where: { githubId, email: userData.email, },
        defaults: {
            username: userData.displayName,
            email: userData.email,
        }
    });
    if (!created) {
        await this.update({ githubId }, {
            where: {
                email: userData.email
            }
        });
    }
    return { user, created };
};

const getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Unable to fetch users' });
    }
}

const addUserByGoogle = async (profile) => {
    try {
        const googleId = profile.id;
        const userData = {
            displayName: profile.displayName,
            email: profile.emails[0].value,
        };
        const { user, created } = await User.findOrCreateByGoogleId(googleId, userData);
        if (created) {
            console.log('New user created:', user);
        } else {
            console.log('User is updated:', user);
        }
    } catch (error) {
        console.error('Error creating user:', error);
    }  
}

const addUserByGithub = async (profile) => {
    try {
        const githubId = profile.id;
        const userData = {
            displayName: profile.displayName,
            email: profile.emails[0].value,
        };
        const { user, created } = await User.findOrCreateByGithubId(githubId, userData);
        if (created) {
            console.log('New user created:', user);
        } else {
            console.log('User is updated:', user);
        }
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

const getUserById = async (req, res) => {
    try {
      let user = await User.findOne({
        where: {
          githubId: req.params.userId
        }
      });
      if(user === null) {
        user = await User.findOne({
            where: {
              googleId: req.params.userId
            }
          });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Unable to fetch user' });
    }
}

const updatePreferredLang = async (req, res) => {
    try {
        const { preferredLanguage, userId } = req.body; 
        await User.update({ preferredLanguage }, {
            where: {
                id: userId
            }
        });
        res.status(200).json({message: "preferred language is updated!"});
    } catch {
        console.error('Error updating prefered language:', error);
        res.status(500).json({ error: 'Unable to update prefered language' });
    }
}

module.exports = {
    getAllUsers,
    addUserByGoogle,
    addUserByGithub,
    getUserById,
    updatePreferredLang
}