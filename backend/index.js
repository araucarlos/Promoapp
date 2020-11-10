const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000;
const jwt = require('jsonwebtoken');
const cors = require('cors');

app.set('key','secretkey')
app.use(cors())
app.use(bodyParser.json())

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.post('/login', (req, res) => {
  if(req.body.username === "carlos" && req.body.password === "helloworld") {
    const payload = {
      check:  true
    };
    const token = jwt.sign(payload, app.get('key'), {
      expiresIn: 1440
    });
    res.json({
      mensaje: "Authentication ok",
      token: token
    });
  } else {
    res.json({ mensaje: "Incorrect User or Password"})
  }
})

const rutasProtegidas = express.Router(); 
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['authorization'];
    console.log(req.headers)
    if (token) {
      jwt.verify(token, app.get('key'), (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Invalid Token' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token missing' 
      });
    }
 });

//ccreativo table
app.get('/offers', rutasProtegidas, db.getOffers)
app.get('/offers/:id', rutasProtegidas, db.getOfferById)
app.post('/offers', rutasProtegidas, db.createOffer)
app.put('/offers/:id', rutasProtegidas, db.updateOffer)
app.delete('/offers/:id', rutasProtegidas, db.deleteOffer)

//lineup table
app.get('/modelgroup', rutasProtegidas, db.getModelGroups)
app.get('/localcode/:modelgroup', rutasProtegidas, db.getLvcByMG)
app.get('/price/:localcode', rutasProtegidas, db.getNrpByLvc)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})