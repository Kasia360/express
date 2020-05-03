const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const fileupload = require('express-fileupload');
//const formidable = require('formidable');

const app = express();

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileupload());

app.use('/user', (req, res, next) => {
  res.send('You should log in to enter!');

});

app.use((req, res, next) => {
  res.show = name => {
    res.sendFile(path.join(__dirname + `/views/${name}`));
  };
  next();
});

app.use(express.static(path.join(__dirname + '/public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/home', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about', { layout: 'dark' });
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello ', { name: req.params.name });
});

app.post('/contact/send-message', (req, res) => {
  console.log('::', req.body);
  console.log('::', req.files);
  const { author, sender, title, message } = req.body;
  const { attachment } = req.files;

  if (author && sender && title && message && attachment) {
    res.render('contact', { isSent: true, fileName: attachment.name });
  } else {
    res.render('contact', { isError: true });
  }
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname + `/public/404.png`));
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
