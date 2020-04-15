const express = require('express');
const path = require('path');

const app = express();

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
  res.show('index.html');
});

app.get('/home', (req, res) => {
  res.show('index.html');
});

app.get('/about', (req, res) => {
  res.show('about.html');
});

app.get('/contact', (req, res) => {
  res.show('contact.html');
});

app.get('/info', (req, res) => {
  res.show('info.html');
});

app.get('/history', (req, res) => {
  res.show('history.html');
});

app.get('/hello/:name', (req, res) => {
  res.send('Hello' + req.params.id);
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname + `/public/404.png`));
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
