import express from 'express';
import path from 'path';

const app = new express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});