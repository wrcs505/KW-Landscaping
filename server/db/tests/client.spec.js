// import testing stuff we need:
const chai = require('chai')
const _ = require('lodash');

const expect = chai.expect
const should = chai.expect

// chai-things is just a little library that makes
// running assertions on arrays slightly easier
chai.use(require('chai-things'));

// import stuff we are testing:
const db = require('../index.js')
// console.log('DB log: ', db)
const Client = db.models.client
const Invoice = db.models.invoice

describe('Client model', function () {

  // let's sync the db with {force:true }
  // This drops the tables, then rebuilds them
  beforeEach(function(done){
    db.sync({force: true})
      .then(function(){
        done()
      })
      .catch(function(err){
        done(err)
      })
  })

  describe('Instance methods', function () {
    describe('handleInvoices', function () {
      // we need to make at least three instances. Could do this by chaining promises,
      // but we don't need to do them in order, so let's use Promise.all instead
      let client, testInvoices;

      beforeEach(function(){
        return Promise.all([
          Client.create({
            clientType: 'RESIDENTIAL',
            contactType: 'RESIDENT-OWNER',
            firstName: 'Sammy',
            lastName: 'Watkins',
            companyName: '',
            billingAddress: '2 Valley Blvd, Clemson, SC',
            contactAddress: '2 Valley Blvd, Clemson, SC',
            phone: '864-555-5555',
            email: 'sammy@clemson.edu',
            clientStartDate: '2013-01-15',
            clientEndDate: '2015-01-15',
            description: 'Mr. Watkins originally contacted KWL regarding sod management service @ main residence in Clemson. KWL successfully installed 100 yds of Bermuda, upon which Mr. Watkins requested installation of an automated irrigation system. The irrigation system installation is in progress.',
            notes: 'Client is a polite older gentleman. Client\'s driveway is gravel--trucks must be parked on street to avoid damage.',
            // workLocations: '2 Valley Blvd, Clemson, SC || 2 Valley Blvd, Charleston, SC',
            // invoiceId: 1
            }),
          Invoice.create({
            status: 'CLEARED',
            subTotal: 500000,
            discounts: 50000,
            dateIssued: '2013-06-27',
            dateCleared: '2013-06-30',
            description: 'Invoice for Watkins sod install. 10% new customer discount issued',
            notes: 'Asked to pay with credit card.',
            recurring: 'FALSE',
            clientId: 1
          }),
          Invoice.create({
            status: 'CLEARED',
            subTotal: 500000,
            discounts: 0,
            dateIssued: '2013-07-27',
            dateCleared: '2013-07-30',
            description: 'Invoice for Watkins irrigation consult.',
            notes: 'Client request for extra 2 weeks granted.',
            recurring: 'FALSE',
            clientId: 1
          }),
          Invoice.create({
            status: 'CLEARED',
            subTotal: 500000,
            discounts: 1000,
            dateIssued: '2013-08-27',
            dateCleared: '2013-08-30',
            description: 'Invoice for peach tree install.',
            notes: '',
            recurring: 'FALSE',
            clientId: 1
          })
        ])
        .then(function(arr){
          client = arr[0]
          testInvoices = arr.slice(1)
        })
        .catch(err => console.log("ERROR: ", err))
      })

      xit('gets all invoices associated to the client', function(){
        return Client.getInvoices(client)
          .then(function(invoices){
            expect(invoices.length).to.equal(testInvoices.length)
            //'chai-things' is necessary for this:
            expect(invoices).to.contain.a.thing.with.property('clientId', client.id)
          })
      });

      xit('sums all billings for all invoices associated to the client, returning a number', function(){
        return Client.sumInvoices(client)
          .then(function(sum){
            let testSum = _.sumBy(testInvoices, function(inv) {
              return inv.subTotal - inv.discounts
            })
            expect((testSum / 100)).to.equal(sum)
            //'chai-things' is necessary for this:
            expect(_.isNumber(testSum)).to.equal.true;
          })
      });

      xit('averages billings for all invoices associated to the client, returning a number', function(){
        return Client.avgBillingPerInvoice(client)
          .then(function(avg){
            let testSum = _.sumBy(testInvoices, function(inv) {
              return inv.subTotal - inv.discounts
            })
            let testAvg = (testSum / 100) / testInvoices.length
            expect(testAvg).to.equal(avg)
            //'chai-things' is necessary for this:
            expect(_.isNumber(testAvg)).to.equal.true;
          })
      });
    });
  });
})



