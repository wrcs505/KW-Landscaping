const Sequelize = require('sequelize');
const db = require('../db');
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
    type: Sequelize.TEXT,
  },
  datesWorked: {
    // type: Sequelize.ARRAY(Sequelize.STRING),
    // defaultValue: []
    type: Sequelize.TEXT
  },
  dateCompleted: {
    type: Sequelize.TEXT,
  },
  recurring: {
    type: Sequelize.BOOLEAN,
  },
  media: {
    // type: Sequelize.ARRAY(Sequelize.STRING),
    // defaultValue: []
    type: Sequelize.TEXT
  }
});

// total internal project costs to date?


module.exports = Project;
