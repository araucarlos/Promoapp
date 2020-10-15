const Pool = require('pg').Pool
const pool = new Pool({
  user: 'carlos',
  host: 'localhost',
  database: 'ccreativo',
  password: 'password',
  port: 5432,
})

// ccreativo table

const getOffers = (request, response) => {
  pool.query('SELECT * FROM ccreativo ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getOfferById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM ccreativo WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createOffer = (request, response) => {
  const { date, model_group, local_code, header, legal } = request.body

  pool.query('INSERT INTO ccreativo (date, model_group, local_code, header, legal) VALUES ($1, $2, $3, $4, $5) RETURNING id', [date, model_group, local_code, header, legal], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).json({message:`Offer added with ID: ${result.rows[0].id}`})
  })
}

const updateOffer = (request, response) => {
  const id = parseInt(request.params.id)
  const { date, model_group, local_code, header, legal } = request.body

  pool.query(
    'UPDATE ccreativo SET date = $1, model_group = $2, local_code = $3, header = $4, legal = =$5 WHERE id = $6',
    [date, model_group, local_code, header, legal, id],
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

  pool.query('DELETE FROM ccreativo WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send({message:`Offer deleted with ID: ${id}`})
  })
}

// lineup table

const getModelGroups = (request, response) => {
  pool.query('SELECT DISTINCT model_group FROM lineup', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getLvcByMG = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM lineup WHERE model_group = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getOffers,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer,
  getModelGroups,
  getLvcByMG,
}