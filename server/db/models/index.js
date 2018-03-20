const User = require('./user')
const Client = require('./client')
const Project = require('./project')
const Invoice = require('./invoice')
const Equipment = require('./equipment')
const Staff = require('./staff')
const Receipt = require('./receipt')
const Transaction = require('./transaction')


/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */


// Project-Client associations
// will add getClient/setClient/addClient to Project
Project.belongsTo(Client, {constraints: false});
// will add getProject/setProject/addProject/addProjects to Client
Client.hasMany(Project, {constraints: false});
// console.log('index logger: ', Client.getProject)
// console.log('index logger: ', Object.keys(Project))
// console.log('\n index logger: ', Client.getProjects)

// Client-Invoice associations
// will add getClient/setClient/addClient to Invoice

// Invoice.belongsTo(Client, {through: 'ClientInvoices'});
Client.hasMany(Invoice, {constraints: false})
// will add getInvoice/setInvoice/addInvoice/addInvoices to Client
// Client.belongsToMany(Invoice, {through: 'ClientInvoices'});
// console.log('index logger: ', Client.get)

// Project-Equipment associations
// will add getEquipment/setEquipment/addEquipment to Project
// Equipment.hasMany(Project)
// Project.belongsTo(Equipment)

Project.hasMany(Equipment)
Equipment.belongsTo(Project)
// Project.belongsToMany(Equipment, {through: 'ProjectEquipment', foreignKey: 'projectId', otherKey: 'equipmentId'});
// will add getProject/setProject/addProject/addProjects to Equipment
// Equipment.belongsToMany(Project, {through: 'ProjectEquipment'});


// Project-Staff associations
// will add getProject/setProject/addProject to Staff
Staff.belongsToMany(Project, {through: 'ProjectStaff'});
// will add getStaff/setStaff/addStaff to Project
Project.belongsToMany(Staff, {through: 'ProjectStaff'});


// Project-Receipt associations
// will add getProject/setProject/addProject to Receipt
Receipt.belongsToMany(Project, {through: 'ProjectReceipts'});
// will add getReceipt/setReceipt/addReceipt/addReceipts to Project
Project.belongsToMany(Receipt, {through: 'ProjectReceipts'});

// Project-Invoice associations
// will add getInvoice/setInvoice/addInvoice to Project
Project.hasMany(Invoice, {constraints: false});
// will add getProject/setProject/addProject/addProjects to Invoice
Invoice.belongsTo(Project, {constraints: false});

/*

// Equipment-Receipt associations
// will add getReceipt/setReceipt/addReceipt to Equipment
Equipment.belongsToMany(Receipt, {through: 'EquipmentReceipts'});
// will add getEquipment/setEquipment/addEquipment to Receipt
Receipt.belongsToMany(Equipment, {through: 'EquipmentReceipts'});

// Equipment-Staff associations
// will add getEquipment/setEquipment/addEquipment to Staff
Staff.belongsToMany(Equipment, {through: 'StaffEquipment'});
// will add getStaff/setStaff/addStaff to Equipment
Equipment.belongsToMany(Staff, {through: 'StaffEquipment'});

// Transaction-Invoice associations
// will add getInvoice/setInvoice/addInvoice to transaction
Transaction.belongsTo(Invoice, {through: 'InvoiceTransactions'});
// will add getTransaction/setTransaction/addTransaction/getTransactions to Invoice
Invoice.belongsToMany(Transaction, {through: 'InvoiceTransactions'});

// Transaction-Receipt associations
// will add getReceipt/setReceipt/addReceipt to transaction
Transaction.belongsTo(Receipt, {through: 'ReceiptTransactions'});
// will add getTransaction/setTransaction/addTransaction/getTransactions to Receipt
Receipt.belongsToMany(Transaction, {through: 'ReceiptTransactions'});

*/

 module.exports = {
  User,
  Equipment,
  Client,
  Receipt,
  Invoice,
  Project,
  Staff,
  Transaction
}
