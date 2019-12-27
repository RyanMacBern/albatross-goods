var config = {};

config.db = {
    url: 'mongodb://localhost:27017',
    name: 'albatrossgoods',
    options: {
        useUnifiedTopology: true
    }
};

module.exports = config;