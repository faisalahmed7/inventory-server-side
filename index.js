const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const res = require('express/lib/response');
require('dotenv').config()



app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.n44g7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {

    try {
        await client.connect();
        const productCollection = client.db('electronicsProducts').collection('product');
        app.get('/inventory', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query)
            const products = await cursor.toArray()
            res.send(products)
        })
    }
    finally {

    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Warehouse-server is running')
});

app.listen(port, () => {
    console.log("Listening to the Port 5000", port);
})