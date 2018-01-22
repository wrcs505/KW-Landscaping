const Sequelize = require('sequelize');
const db = require('../db');
// const Product = require('./product');
// const Category = require ('./category');

const Transaction = db.define('transaction', {
  type: {
    type: Sequelize.ENUM('PAYABLE', 'RECEIVABLE'),
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
  date: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  notes: {
    type: Sequelize.STRING
  },
  paymentType: {
    type: Sequelize.ENUM('CASH', 'STRIPE', 'PAYPAL', 'CHECK'),
  }
});


module.exports = Transaction;
