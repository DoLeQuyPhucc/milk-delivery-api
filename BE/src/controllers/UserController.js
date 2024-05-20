import UserModel from '../models/user.js';

const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};

export { getUsers };