const router = require('express').Router()
const {Project} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Project.findAll({
    // explicitly select returned attributes
    attributes: ['id', 'status', 'name', 'dateStarted', 'dateCompleted', 'media', 'recurring', 'description', 'notes']
  })
    .then(projects => res.json(projects))
    .catch(next)
})

// Gets a project by ID
router.get('/:id', (req, res, next) => {
  Project.findById(req.params.id)
  .then(project => res.json(project))
  .catch(next)
})

// Create a project
router.post('/', function (req, res, next) {
  Project.create(req.body)
    .then(project => res.json(project))
    .catch(next);
})

router.put('/', (req, res, next) => {
  if (!req.body.id) res.sendStatus(404)

  Project.findById(+req.body.id)
  .then(project => project.update(req.body))
  .then(project => {
    res.json(project)
  })
  .catch(next)
})

router.delete('/:id', function (req, res, next) {
  const id = req.params.id;

  Project.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
});
