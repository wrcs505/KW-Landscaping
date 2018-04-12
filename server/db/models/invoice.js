const Sequelize = require('sequelize');
const db = require('../db');
// const Product = require('./product');
// const Category = require ('./category');

const Invoice = db.define('invoice', {
  status: {
    type: Sequelize.ENUM('ISSUED', 'OVERDUE', 'PARTIAL', 'CLEARED', 'CANCELLED', 'REFUNDED'),
    allowNull: false
  },
  // money in cents
  subTotal: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
        min: 0
    }
  },
  total: {
    type: Sequelize.VIRTUAL,
    get: function() {
      if (this.subTotal) {
        return this.subTotal - this.discounts;
      } else {
        return 0;
      }
    }
  },
  discounts: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
        min: 0
    }
  },
  dateIssued: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  dateCleared: {
    type: Sequelize.TEXT,
  },
  recurring: {
    type: Sequelize.BOOLEAN,
  },
  // description is external, notes are internal
  description: {
    type: Sequelize.TEXT('long'),
    allowNull: false
  },
  notes: {
    type: Sequelize.TEXT('long')
  },
});


module.exports = Invoice;
