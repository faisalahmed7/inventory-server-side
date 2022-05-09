const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config()



app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.n44g7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {

    try {
        await client.connect();
        const productCollection = client.db('electronicsProducts').collection('product');
        const upcomingCollection = client.db('electronicsProducts').collection('upcoming');
        const awardCollection = client.db('electronicsProducts').collection('award');

        app.get('/inventory', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query)
            const products = await cursor.toArray()
            res.send(products)
        })
        app.get('/inventory/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const product = await productCollection.findOne(query)
            res.send(product)
        })
        //POST
        app.post('/inventory', async (req, res) => {
            const newProduct = req.body;
            const result = await productCollection.insertOne(newProduct)
            res.send(result)
        })
        //My items DATA 
        app.get("/item", async (req, res) => {
            const email = req.query.email;
            console.log(email);
            const query = { email: email };
            const cursor = productCollection.find(query);
            const items = await cursor.toArray();
            res.send(items);
        });


        //DELETE
        app.delete('/inventory/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productCollection.deleteOne(query)
            res.send(result)
        })

        //Upcoming Products

        app.get('/upcoming', async (req, res) => {
            const query = {};
            const cursor = upcomingCollection.find(query)
            const upcomingProducts = await cursor.toArray()
            res.send(upcomingProducts)
        })
        app.get('/award', async (req, res) => {
            const query = {};
            const cursor = awardCollection.find(query)
            const awardProducts = await cursor.toArray()
            res.send(awardProducts)
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