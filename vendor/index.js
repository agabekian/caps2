'use strict';
const io = require('socket.io-client');
const {vendor_says, handlePickup} = require('./vendor');
const Chance = require('chance');
const Queue = require('../Queue.js'); //lab13


let serverURL = process.env.SERVER_URL || "http://localhost:3000";
const socket = io.connect(serverURL);

const fake = new Chance();
generateLabel()


socket.on('in-transit', handlePickup);

socket.on('delivered', (payload) => {
    vendor_says(payload.orderId);
        // doesn't work conflict with port, why?
})


function generateLabel() {
    setInterval(() => {
        let order = {
            orderId: fake.guid(),
            status: 'ready',
            store: fake.company(),
            customer: fake.name(),
            address: fake.address(),
            amount: fake.dollar()
        };
        console.log('VENDOR: New Order', order.orderId);
        socket.emit('ready-for-pickup', order);
    }, 2000);
}




