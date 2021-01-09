const { MongoClient } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
   constructor() {
      this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
      this.dbName = DB_NAME;
   }

   connect() {
      return new Promise((resolve, reject) => {
         this.client.connect(err => {
            if (err) {
               this.connect();
               reject(err);
            }

            console.log('Connected successfuly to mongo');
            resolve(this.client.db(this.dbName));
         });
      });
   }

   getAll(collection, query) {
      return this.connect()
         .then(db => {
            return db.collection(collection).find(query).toArray();
         })
         .catch(console.log);
   }
}

module.exports = MongoLib;