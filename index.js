const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()



app.use(cors())
app.use(express.json())



const uri = "mongodb+srv://productUser:qraNLLsnNa80T1tj@cluster0.n44g7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {

    const collection = client.db("test").collection("devices");
    console.log('connected with MYDB');
    // perform actions on the collection object
    client.close();
});


app.get('/', (req, res) => {
    res.send('Warehouse-server is running')
});

app.listen(port, () => {
    console.log("Listening to the Port 5000", port);
})