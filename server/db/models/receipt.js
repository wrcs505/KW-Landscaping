const Sequelize = require('sequelize');
const db = require('../db');
// const Product = require('./product');
// const Category = require ('./category');

const Receipt = db.define('receipt', {
  purpose: {
    type: Sequelize.ENUM('PAYROLL', 'EQUIPMENT', 'MATERIALS', 'ASSOCIATE', 'REIMBURSEMENT', 'DISTRIBUTION'),
    allowNull: false
  },
  // money in cents
  total: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
        min: 0
    }
  },
  dateReceived: {
    type: Sequelize.DATE,
    allowNull: false
  },
  dateCleared: {
    type: Sequelize.DATE,
  },
  // description is external, notes are internal
  description: {
    type: Sequelize.TEXT('long'),
    allowNull: false
  },
  notes: {
    type: Sequelize.STRING
  },
  recurring: {
    type: Sequelize.BOOLEAN,
  },
});


module.exports = Receipt;
