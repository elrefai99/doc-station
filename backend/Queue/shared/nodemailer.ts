import nodemailer from 'nodemailer'

export const nodemailerFunction = async (email: string, temp: string, subject: string) => {
     try {
          var transporter = nodemailer.createTransport({
               service: 'gmail',
               auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
               },
          })

          var mailOptions = {
               from: process.env.EMAIL_USER,
               to: email,
               subject: subject,
               html: temp,
          }

          transporter.sendMail(mailOptions, function (error, info) {
               if (error) {
                    console.log(error)
               }
               else {
                    console.log('Email sent: ' + info.response)
               }
          })
     }
     catch (err) {
          console.error(err)
     }
}
