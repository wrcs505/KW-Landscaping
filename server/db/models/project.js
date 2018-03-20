const Sequelize = require('sequelize');
const db = require('../db');
const Invoice = require('./invoice')
const _ = require('lodash');
// const Product = require('./product');
// const Category = require ('./category');

const Project = db.define('project', {
  status: {
    type: Sequelize.ENUM('PLANNING', 'SCHEDULED', 'IN-PROGRESS', 'COMPLETE'),
    defaultValue: 'PLANNING',
    allowNull: false
  },
  name: {
    type: Sequelize.TEXT
  },
  locations: {
    // type: Sequelize.ARRAY(Sequelize.STRING),
    // defaultValue: []
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
  dateStarted: {
    type: Sequelize.DATE,
  },
  // datesWorked: {
  //   // type: Sequelize.ARRAY(Sequelize.STRING),
  //   // defaultValue: []
  //   type: Sequelize.DATE
  // },
  dateCompleted: {
    type: Sequelize.DATE,
  },
  recurring: {
    type: Sequelize.BOOLEAN,
  },
  media: {
    // type: Sequelize.ARRAY(Sequelize.STRING),
    // defaultValue: []
    type: Sequelize.TEXT
  }
// }, {
//   defaultScope: {
//     include: [Invoice]
//   }
});

// total internal project costs to date?
// class methods

Project.sumProjectInvoices = function(project) {
  return project.getInvoices()
    .then(invoices => {
      let sum = _.sumBy(invoices, function(inv) {
        return inv.subTotal - inv.discounts
      })
      return sum / 100
    })
}




module.exports = Project;
