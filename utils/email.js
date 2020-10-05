const nodemailer = require('nodemailer')

const sendEmail = async options => {
    // 1) Create a transporter
    console.log('Reachhh')
    const transporter = nodemailer.createTransport({
        // service: 'Gmail',
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
        // Activate in gmail "less secure app" option
    })
    // 2) Define the email options
    const mailOptions = {
        from: 'Gagandeep Singh Ahuja <gagandeepahuja09@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    console.log({ transporter, mailOptions })
    // 3) Send the email
    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail