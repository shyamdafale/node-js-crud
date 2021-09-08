const accountSid = "";
const authToken = "";
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'This is the testing message from urbanfarmer',
        from: '+18582408150',
        to: '+919359909983'
    })
    .then(message => console.log(message.sid));