import express from 'express';
import path from 'path';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

const app = express();
app.use(bodyParser.json());

app.use('/api/users', userRoute);

app.use('/api/products', productRoute);

app.use('/api/orders', orderRoute);

// app.get('/api/products/:id', (req, res) => {

//     const productId = req.params.id;

//     const product = data.products.find(x => x._id === productId);

//     if (product)
//         res.send(product);
//     else
//         res.status(404).send({msg: "Product not found."});
// });

// app.get('/api/products', (req, res) => {

//     res.send(data.products);
// });


app.use(express.static('public'));
app.get('*', (req, res) => {

    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || config.PORT;

app.listen(port, ()=> {console.log(`Server started at http://localhost:${port} `);});