const Sequelize = require('sequelize')
const db = require('../db')

const Equipment = db.define('equipment', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  type: {
    type: Sequelize.STRING
  },
  cost: {
    type: Sequelize.INTEGER
  },
  startService: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  endService: {
    type: Sequelize.TEXT,
  },
  condition: {
    type: Sequelize.TEXT
  },
  storageLocation: {
    type: Sequelize.TEXT
  },
  manufacturer: {
    type: Sequelize.TEXT
  },
  serialNumber: {
    type: Sequelize.TEXT
  },
  // description is external, notes are internal
  description: {
    type: Sequelize.TEXT
  },
  notes: {
    type: Sequelize.TEXT
  }
})


module.exports = Equipment
