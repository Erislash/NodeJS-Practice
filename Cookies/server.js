const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.get('/', (req, res) => {
    res.cookie('sky', 'blue', {httpOnly:true});
    res.send('Hello');
})



app.listen(3000, () => {
    console.log('Server running on port 3000...')
})