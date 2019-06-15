const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// sgMail.send({
//     to: 'byronleigh80@gmail.com',
//     from:'byronleigh80@gmail.com',
//     subject:'This is my first creation',
//     text:'I hope this one actually gets to you'
// });

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'byronleigh80@gmail.com',
        subject:'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app`
    });

}

const cancelAccountEmail = (email, name) => {

    sgMail.send({
        to:email,
        from: 'byronleigh80@gmail.com',
        subject: 'Sad to see you go!',
        text: `Good bye ${name} :-(. Please provide feedback regarding your experience.`
    })
}



module.exports = {
    sendWelcomeEmail,
    cancelAccountEmail
}