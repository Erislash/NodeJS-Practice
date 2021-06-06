require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;


const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("passportGoogleTest").collection("id");
  // perform actions on the collection object
  client.close();
});
