const mongoose = require('mongoose');
require('dotenv').config()
const CosmosClient = require("@azure/cosmos").CosmosClient;
const { KeyClient } = require("@azure/keyvault-keys");
const { DefaultAzureCredential } = require("@azure/identity");


const credential = new DefaultAzureCredential();

// const connstr = `mongodb://${process.env.COSMOSDB_HOST}:${process.env.COSMOSDB_PORT}/${process.env.COSMOSDB_DBNAME}?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000`;

const endpoint = process.env.COSMOSDB_ENDPOINT;
const key = process.env.COSMOSDB_KEY;
const client = new CosmosClient({endpoint,key})

async function main(){

 const { database } = await client.databases.createIfNotExists({ id: "schooldb" });
 console.log(database.id);

 const { container } = await database.containers.createIfNotExists({ id: "teachers" });
 console.log(container.id);

 const teachers = [
    { id: "1", name: "Eduardo", state: "WA", isCapitol: true },
    { id: "2", name: "Jose", state: "WA", isCapitol: false },
    { id: "3", name: "Francisco", state: "IL", isCapitol: false }
  ];
  for (const teacher of teachers) {
    await container.items.create(teacher);
  }


}

main().catch((error) => {
    console.error(error);
});
// exports.connect = () => {
//     mongoose.connect(connstr, {

//     auth: {
//         username: process.env.COSMOSDB_USER,
//         password: process.env.COSMOSDB_PASSWORD
//       },
//     })
//       .then(()=> console.log('Mongodb connected...'))
//     .catch(err => console.log(err));
// }  
 