const express = require('express');

const app = express();
const port = parseInt(process.env.PORT, 10) || 3000;

// app.use((req, res, next) => {
//     if (req.path === '/') {
//         console.log('home page hit');
//     }
//     next();
// });
app.use(express.static('public'));
app.use((req, res) => {
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = app;
