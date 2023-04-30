const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://shawn223:lawdog223@cluster0.5d3udpo.mongodb.net/?retryWrites=true&w=majority";
const dbName = "shawnsDataBase";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('schedule').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

app.post('/schedule', (req, res) => {
  db.collection('schedule').insertOne({name: req.body.name, date: req.body.date, shift: req.body.shift,thumbUp:req.body.thumbUp}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/schedule', (req, res) => {
  db.collection('schedule')
  .findOneAndUpdate({name: req.body.name, date: req.body.date}, {
    $set: {
      shift:"Time to go Home!"
    }
  }, {
    sort: {_id: -1},
    upsert: false
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/schedule', (req, res) => {
  db.collection('schedule').findOneAndDelete({name: req.body.name, date: req.body.date, shift: req.body.shift}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
