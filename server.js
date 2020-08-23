const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const projects = require('./projects/index');

const app = new express();
const port = process.env.PORT || 3000;

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(compression());
app.use(express.static(path.resolve(__dirname, 'dist/public')));

app.get('/', (req, res) => {
    res.render('index', {
        projects,
    });
});

app.get('/favicon.ico', (req, res) => {
    res.sendStatus(204);
});

app.get('*', (req, res) => {
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});