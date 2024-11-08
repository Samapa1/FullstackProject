const Queue = require('bull')
const { Reservation } = require('../models')

const testqueue = new Queue("myQueue");

const checkStatus  = async () => {
    const reservations= await Reservation.findAll({
        where: {available: true}
    })
    let currentDate = new Date()
    const toBeRemoved = reservations.filter(reservation => new Date(reservation.dueDate) < currentDate)
    console.log("filtteröidyt")
    toBeRemoved.map(reservation => console.log(reservation.id))

    let i = 0
    while (i < toBeRemoved.length) {
        console.log(toBeRemoved[i])
        await toBeRemoved[i].destroy()
        i ++
    }

    console.log("suoritettu")
    return 

}

testqueue.add(checkStatus(), { repeat: 
    {every: 10000,
    limit: 100 }
});


