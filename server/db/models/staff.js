const Sequelize = require('sequelize')
const db = require('../db')

const Staff = db.define('staff', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.VIRTUAL,
    get () {
      return `${this.firstName} ${this.lastName}`;
    }
  },
  // implement Twilio validation for phones?
  phone: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  contactAddress: {
    type: Sequelize.STRING
  },
  startDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  endDate: {
    type: Sequelize.DATE
  },
  role: {
    type: Sequelize.TEXT
  },
  skills: {
    type: Sequelize.TEXT
  },
  notes: {
    type: Sequelize.TEXT
  }
})

// earnings + hours YTD and all-time?

module.exports = Staff
