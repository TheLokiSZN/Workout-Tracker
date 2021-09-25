const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const PORT = 3000;
const app = express();

app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static('public'));


mongoose.connect("mongodb://localhost/userdb", { 
    useNewUrlParser: true, 
    useFindAndModify: false,
    useUnifiedTopology: true,
});
app.use(require('./routes/api.js'));
app.use(require('./routes/view.js'));

app.listen(PORT, () => {
    console.log(`app listening on ${PORT}`)
})