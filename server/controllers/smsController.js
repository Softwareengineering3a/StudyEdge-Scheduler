const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: '13344c0f',
  apiSecret: 'T2bNCu9sZVCtcot1',
});

const from = ''; //get client to pay for sms hosting, insert host number here
const to = ''; //make call to student database to fetch number
const text = 'Your Reservation for ___ class at ___ time and date have been confirmed. Congratulations!';

nexmo.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
        console.log(err);
    } else {
        if(responseData.messages[0]['status'] === "0") {
            console.log("Message sent successfully.");
        } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }
    }
});