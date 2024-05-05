import nodemailer from "nodemailer";

export default async function sendMail(
  to: string | undefined,
  name: string | null,
  image: string,
  url: string,
  subject: string,
  template: string,
  password?: string|null|undefined
) {
  const {
    MAILING_EMAIL,
    MAILING_PASSWORD,
    SMTP_HOST,
    SMTP_EMAIL,
    SMTP_PASSWORD,
    SMTP_PORT,
  } = process.env;

  let transporter = await nodemailer.createTransport({
    /*
    port: Number(SMTP_PORT),
    host: SMTP_HOST,
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
     */
    service: "gmail",
    auth: {
      user: MAILING_EMAIL,
      pass: MAILING_PASSWORD,
    },
  });

  
  // html replacment
  let emailTemplate = ""

  if(password){
    emailTemplate = template
    .replace("{{email_link}}", url as string)
    .replace("{{name}}", name as string)
    .replace("{{password}}", password as string)
  } else {
    emailTemplate = template
    .replace("{{email_link}}", url as string)
    .replace("{{name}}", name as string)
  }

  // verify connection
  await new Promise((resolve, reject) => {
    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("server is listening...");
        resolve(success);
      }
    });
  });

  // send email
  const options = {
    from: MAILING_EMAIL,
    to: to,
    subject: subject,
    html: emailTemplate,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(options, (err, info) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
}
