const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const customerRoutes = require('./routes/customers');

const app = express();

const port = 5000;

app.use(cors());


app.use(bodyParser.json());

mongoose.connect('mongodb+srv://srikanthbisai2110:zKjH6LfKpduPbfTM@data.o6rwbef.mongodb.net/?retryWrites=true&w=majority&appName=data');

app.use('/api/customers', customerRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
