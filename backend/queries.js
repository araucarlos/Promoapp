const Pool = require('pg').Pool
const pool = new Pool({
  user: 'carlos',
  host: 'localhost',
  database: 'promoapp',
  password: 'password',
  port: 5432,
})
const jwt = require('jsonwebtoken');

// login table

const login = (request, response) => {
  const { email, password } = request.body
  pool.query('SELECT id FROM users WHERE email = $1 AND password = crypt($2, password)', [email, password], (error, results) =>{
    if (error) {
      throw error
    }
    if (results.rows[0] == null){
      response.json({ message: "Incorrect User or Password"})
    }else{
      const payload = {
        check:  true
      };
      const token = jwt.sign(payload, 'secretkey', {
        expiresIn: 1440
      });
      response.json({
        message: "Authentication ok",
        token: token
      });  
    }
  })
}

// ccreativo table

const getOffers = (request, response) => {
  pool.query('SELECT * FROM ccreativo2 ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getOfferById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM ccreativo2 WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createOffer = (request, response) => {
  const { model_group, header, price, type1, type2, date, legal, emissions, finance } = request.body

  pool.query('INSERT INTO ccreativo2 (model_group, header, price, type1, type2, date, legal, emissions, finance) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id', [model_group, header, price, type1, type2, date, legal, emissions, finance], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).json({message:`Offer added with ID: ${result.rows[0].id}`})
  })
}

const updateOffer = (request, response) => {
  const id = parseInt(request.params.id)
  const { model_group, header, price, type1, type2, date, legal, emissions, finance } = request.body

  pool.query(
    'UPDATE ccreativo2 SET model_group = $1, header = $2, price = $3, type1 = $4, type2 = $5, date = $6, legal = $7, emissions = $8, finance = $9 WHERE id = $10',
    [ model_group, header, price, type1, type2, date, legal, emissions, finance, id ],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({message: `Offer modified with ID: ${id}`})
    }
  )
}

const deleteOffer = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM ccreativo2 WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send({message:`Offer deleted with ID: ${id}`})
  })
}


// lineup table

const getModelGroups = (request, response) => {
  pool.query('SELECT DISTINCT model_group FROM lineup_pyb', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const getLvcByMG = (request, response) => {
  const mg = request.params.modelgroup

  pool.query('SELECT * FROM lineup_pyb WHERE model_group = $1', [mg], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getByLvc = (request, response) => {
  const lvc = request.params.localcode

  pool.query('SELECT * FROM lineup_pyb WHERE local_code = $1', [lvc], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getddiscount = (request, response) => {
  const mg = request.params.modelgroup
  const bt = request.params.body
  const grade = request.params.grade
  const campaign = 'Oferta Cliente'

  pool.query('SELECT discount FROM campaign WHERE model_group = $1 AND body = $2 AND grade = $3 AND campaign = $4', [mg, bt, grade, campaign], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getfdiscount = (request, response) => {
  const mg = request.params.modelgroup
  const campaign = 'Financiacion'

  pool.query('SELECT discount FROM campaign WHERE model_group = $1 AND campaign = $2', [mg, campaign], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  login,
  getOffers,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer,
  getModelGroups,
  getLvcByMG,
  getByLvc,
  getddiscount,
  getfdiscount
}