const Sequelize = require('sequelize')
const db = require('../db')
const Invoice = require('./invoice')
const Project = require('./project')
const _ = require('lodash');

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
  // billingAddress: {
  //   type: Sequelize.STRING
  // },
  // contactAddress: {
  //   type: Sequelize.STRING
  // },
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
    type: Sequelize.DATE,
    allowNull: false
  },
  clientEndDate: {
    type: Sequelize.DATE
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
  // workLocations: {
  //   // type: Sequelize.ARRAY(Sequelize.STRING),
  //   // defaultValue: []
  //   type: Sequelize.TEXT
  // },
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

// class methods

Client.getInvoices = function(client) {
  return Invoice.findAll({
    where: {
      clientId: client.id
    }
  })
}

Client.sumInvoices = function(client) {
  return Invoice.findAll({
    where: {
      clientId: client.id
    }
  })
  .then(invoices => {
    let sum = _.sumBy(invoices, function(inv) {
      return inv.subTotal - inv.discounts
    })
    return sum / 100
  })
}

Client.avgBillingPerInvoice = function(client) {

  return Client.sumInvoices(client)
    .then(billings => {
      return Client.getInvoices(client).then(invoices => {
        return billings / invoices.length
      })
    })
    .catch()
}

Client.avgBillingPerProject = function(client) {
  return Project.findAll({where: {clientId: client.id}})
    .then(projects => {
      return Promise.all(projects.map(project => {
        return Project.sumProjectInvoices(project)
          .then(sum => {
            return sum
          })
          .catch(err => err)
      }))
    })
    .then(summedProjects => {
      return (_.sumBy(summedProjects) / summedProjects.length)
    })
    .catch(err => err)
}


module.exports = Client
