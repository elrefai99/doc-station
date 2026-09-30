import sdGraid from "@sendgrid/mail"

export const sendgridFunction = async (email: string, temp: string, subject: string) => {
     try {
          const sendGraid_API_KEY = process.env.SENDGRID_API_KEY as string
          sdGraid.setApiKey(sendGraid_API_KEY)

          const emailBody = {
               to: email,
               from: "elrefai99@gmail.com",
               subject,
               html: temp
          }
          return sdGraid
               .send(emailBody)
               .then(() => {
                    console.log('Success Send Email ...')
               })
               .catch((err) => console.log(err))
     }
     catch (err) {
          console.error(err)
     }
}
