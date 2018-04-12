const router = require('express').Router()
const {Client} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Client.findAll({
    // explicitly select returned attributes
    attributes: ['id', 'clientType', 'contactType', 'name', 'companyName', 'phone', 'email', 'clientStartDate', 'clientEndDate', 'description', 'notes']
  })
    .then(clients => res.json(clients))
    .catch(next)
})

// Gets a client by ID
router.get('/:id', (req, res, next) => {
  Client.findById(req.params.id)
  .then(client => res.json(client))
  .catch(next)
})

// Create a client
router.post('/', function (req, res, next) {
  Client.create(req.body)
    .then(client => res.json(client))
    .catch(next);
})

router.put('/', (req, res, next) => {
  if (!req.body.id) res.sendStatus(404)

  Client.findById(+req.body.id)
  .then(client => client.update(req.body))
  .then(client => {
    res.json(client)
  })
  .catch(next)
})

router.delete('/:id', function (req, res, next) {
  const id = req.params.id;

  Client.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
});

