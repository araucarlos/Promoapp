const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000;
const cors = require('cors');
const jwt = require('jsonwebtoken');
app.set('key','secretkey')
app.use(cors())
app.use(bodyParser.json())

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

const rutasProtegidas = express.Router(); 
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['authorization'];
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

// login table
app.post('/login',db.login)



//ccreativo table
app.get('/offers', rutasProtegidas, db.getOffers)
app.get('/offers/:id', rutasProtegidas, db.getOfferById)
app.post('/offers', rutasProtegidas, db.createOffer)
app.put('/offers/:id', rutasProtegidas, db.updateOffer)
app.delete('/offers/:id', rutasProtegidas, db.deleteOffer)

//lineup table
app.get('/modelgroup', rutasProtegidas, db.getModelGroups)
app.get('/localcode/:modelgroup', rutasProtegidas, db.getLvcByMG)
app.get('/price/:localcode', rutasProtegidas, db.getByLvc)

//campaing table
app.get('/campaignd/:modelgroup/:body/:grade', rutasProtegidas, db.getddiscount)
app.get('/campaignf/:modelgroup', rutasProtegidas, db.getfdiscount)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})