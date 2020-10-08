const express = require('express');
const path = require('path');
const {MONGODB_URL, PORT, JWT_SECRET} = require('./config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');

//dotenv.config();

const mongodbUrl = MONGODB_URL;
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

const port = process.env.PORT || PORT;

app.listen(port, ()=> {console.log(`Server started at http://localhost:${port} `);});