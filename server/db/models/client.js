const Sequelize = require('sequelize')
const db = require('../db')

const Client = db.define('client', {
  clientType: {
    type: Sequelize.ENUM('RESIDENTIAL', 'ENTERPRISE'),
    allowNull: false
  },
  contactType: {
    type: Sequelize.ENUM('RESIDENT-RENTER', 'RESIDENT-OWNER', 'BUSINESS-CONTACT', 'BUSINESS-OWNER'),
    allowNull: false
  },
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
  companyName: {
    type: Sequelize.STRING
  },
  // should addresses be broken into individal component fields?
  billingAddress: {
    type: Sequelize.STRING
  },
  contactAddress: {
    type: Sequelize.STRING
  },
  // implement Twilio validation for phones?
  phone: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
        isEmail: true
    }
  },
  clientStartDate: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  clientEndDate: {
    type: Sequelize.TEXT
  },
  // description is external, notes are internal
  description: {
    type: Sequelize.TEXT('long'),
    allowNull: false
  },
  notes: {
    type: Sequelize.TEXT('long')
  },
  // may be refactored into association or virtuals:
  workLocations: {
    // type: Sequelize.ARRAY(Sequelize.STRING),
    // defaultValue: []
    type: Sequelize.TEXT
  },
  // invoiceCount: {

  // },
  // projectCount: {

  // },
  // sumBillings: {

  // },
  // avgBillingProjects: {

  // },
  // avgBillingsInvoices: {

  // }
})

module.exports = Client
