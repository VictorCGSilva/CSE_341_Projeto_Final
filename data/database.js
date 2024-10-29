const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let _db;
let _client;

const initDb = (callback) => {
    if (_db) {
        console.log('Db is already initialized!');
        return callback(null, _db);
    }
    MongoClient.connect(process.env.DB_URI)
        .then((client) => {
            _client = client; 
            _db = client.db(process.env.DB_NAME);
            console.log('Database initialized');
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDb = () => {
    if (!_db) {
        throw Error('Db not initialized');
    }
    console.log('Database initialized');
    return _db;
};


const closeDb = async () => {
    if (_client) {
        await _client.close();
        _db = null;
        _client = null;
        console.log('Database connection closed');
    }
};

module.exports = {
    initDb,
    getDb,
    closeDb,
};