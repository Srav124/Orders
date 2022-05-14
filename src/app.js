require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 8000;




// parsing req to bodyparser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}));

// set engine
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send("ALl the best");
})

// app.use('/api', require('./routes/api'));

app.use('/api', require('./routes/api'));

app.listen(PORT , () => {
    console.log(`server running in port ${PORT}`);
})
