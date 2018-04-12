const router = require('express').Router()
const {Invoice} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Invoice.findAll({
    // explicitly set returned attributes
    attributes: ['id', 'status', 'subTotal', 'total', 'discounts', 'dateIssued', 'dateCleared', 'recurring', 'description', 'notes']
  })
    .then(invoices => res.json(invoices))
    .catch(next)
})

// Gets a invoice by ID
router.get('/:id', (req, res, next) => {
  Invoice.findById(req.params.id)
  .then(invoice => res.json(invoice))
  .catch(next)
})

// Create a invoice
router.post('/', function (req, res, next) {
  Invoice.create(req.body)
    .then(invoice => res.json(invoice))
    .catch(next);
})

router.put('/', (req, res, next) => {
  if (!req.body.id) res.sendStatus(404)

  Invoice.findById(+req.body.id)
  .then(invoice => invoice.update(req.body))
  .then(invoice => {
    res.json(invoice)
  })
  .catch(next)
})

router.delete('/:id', function (req, res, next) {
  const id = req.params.id;

  Invoice.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
});

