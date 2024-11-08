const Queue = require('bull')
const { Reservation } = require('../models')

const testqueue = new Queue("myQueue");

const checkStatus  = () => {
    const reservations= Reservation.findAll({
        where: {available: false}
    })
    console.log(reservations)
}

testqueue.add(
    {reservation: 'book'},
    {
        repeat: {
        every: 10000,
        limit: 100
        }
    });

testqueue.process((job, done) => {
  console.log(job.data);
  done();
});

