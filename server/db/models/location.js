const Sequelize = require('sequelize');
const db = require('../db');
// const Product = require('./product');
// const Category = require ('./category');

const Location = db.define('location', {
  type: {
    type: Sequelize.ENUM('WORK_SITE', 'BILLING_ADDRESS', 'CONTACT_ADDRESS', 'STORAGE'),
    allowNull: false
  },
  addressLine1: {
    type: Sequelize.STRING,
    allowNull: false
  },
  addressLine2: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  country: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: 'USA'
  },
  latitude: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    validate: { min: -90, max: 90 }
  },
  longitude: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    validate: { min: -180, max: 180 }
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


module.exports = Location;
