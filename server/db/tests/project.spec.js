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
const Project = db.models.project

describe('Project model', function () {

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

  describe('Association tests', function () {
    let testClient, testProjects, testInvoices;

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
        Project.create({
          status: 'IN-PROGRESS',
          name: 'Watkins - Irrigation system install.',
          // locations: ['2 Valley Blvd, Clemson, SC'],
          locations: '2 Valley Blvd, Clemson, SC',
          description: 'Installation of irrigation system to support new sod install.',
          notes: 'Existing sod shows evidence of over-watering. Instruct client on proper watering protocols.',
          dateStarted: '2013-05-25',
          // datesWorked: ['2013-06-25', '2013-06-26', '2013-06-27'],
          // datesWorked: '2013-06-25 ||  2013-06-26 || 2013-06-27',
          dateCompleted: '2013-06-27',
          recurring: 'FALSE',
          media: '/SWatkins-sod-installation.png',
          clientId: 1
        }),
        Project.create({
          status: 'PLANNING',
          name: 'Watkins - Bermuda sod installation, 100yds.',
          // locations: ['2 Valley Blvd, Clemson, SC'],
          locations: '2 Valley Blvd, Clemson, SC',
          description: 'STANDARD sod install. Includes removal of existing, damaged sod.',
          notes: 'Existing sod shows evidence of over-watering. Instruct client on proper watering protocols.',
          dateStarted: '2013-06-25',
          // datesWorked: ['2013-06-25', '2013-06-26', '2013-06-27'],
          datesWorked: '2013-06-25 ||  2013-06-26 || 2013-06-27',
          dateCompleted: '2013-06-27',
          recurring: 'FALSE',
          media: '/SWatkins-sod-installation.png',
          clientId: 1
        }),
        Project.create({
          status: 'COMPLETE',
          name: 'Watkins - Backyard improvement consult.',
          // locations: ['2 Valley Blvd, Clemson, SC'],
          locations: '2 Valley Blvd, Clemson, SC',
          description: 'Consultation on client\'s desire to improve aesthetics and function in back yard',
          notes: 'Customer has high budget.',
          dateStarted: '2013-04-25',
          // datesWorked: ['2013-06-25', '2013-06-26', '2013-06-27'],
          // datesWorked: '2013-06-25 ||  2013-06-26 || 2013-06-27',
          dateCompleted: '2013-06-27',
          recurring: 'FALSE',
          media: '/SWatkins-sod-installation.png',
          clientId: 1
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
          clientId: 1,
          projectId: 1
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
          clientId: 1,
          projectId: 1
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
          clientId: 1,
          projectId: 1
        })
      ])
      .then(function(arr){
        // console.log("ARR LOG: ", arr)
        testClient = arr[0]
        testProjects = arr.slice(1,4)
      })
      .catch(err => console.log("ERROR: ", err))
    })

    it('Project gets Client', function(){
      return testProjects[0].getClient()
        .then(function(client){
          expect(client.id).to.equal(testClient.id)
        })
    });
    it('Client gets Project', function(){
      return testClient.getProjects()
        .then(function(projects){
          expect(projects.length).to.equal(testProjects.length)
        })
    });

    it('sums all billings for all invoices associated to the project, returning a number', function(){
      Invoice.findAll({where: {projectId: testProjects[0].id}})
      .then(invoices => {
        return Project.sumProjectInvoices(testProjects[0])
        .then(function(sum){
          let testSum = _.sumBy(invoices, function(inv) {
            return inv.subTotal - inv.discounts
          })
          expect(sum).to.equal((testSum / 100))
          expect(_.isNumber(testSum)).to.equal.true;
        })
      });
    });
  });

/*
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
      */
    // });
  // });
})
