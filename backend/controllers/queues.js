const Queue = require('bull')
const { Reservation } = require('../models')

const reservationQueue = () => {

const testqueue = new Queue("myQueue");

const checkStatus  = async () => {
    const reservations= await Reservation.findAll({
        where: {available: true}
    })
    let currentDate = new Date()
    const toBeRemoved = reservations.filter(reservation => new Date(reservation.dueDate) < currentDate)
    
    console.log("checking reservations")

    await Promise.all(toBeRemoved.map(toRemove => toRemove.destroy()))

}

testqueue.add({}, { repeat: 
    { cron: '0 22 * * *' }
    
});

testqueue.process((job, done) => {
    checkStatus()
    console.log(job.data);
    done();
  });

}


module.exports = reservationQueue

