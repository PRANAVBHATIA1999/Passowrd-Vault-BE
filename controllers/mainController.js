const getHealth = (req, res) => {
    res.status(200).json({ status: 'UP', message: 'API is running smoothly' });
};

const welcomeMessage = (req, res) => {
    res.status(200).json({ message: 'Welcome to the Node.js & Express API!' });
};

module.exports = { getHealth, welcomeMessage }