
require(`dotenv`).config();
export default function(req, res) {
  const PASSWORD = process.env.password;
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    port: 465,
    host: `smtp.gmail.com`,
    auth: {
      user: `contactyummr@gmail.com`,
      pass: PASSWORD,
    },
    secure: true,
  });
  const mailData = {
    from: `contactyummr@gmail.com`,
    to: `contactyummr@gmail.com`,
    subject: `${req.body.restaurantName} has signed up!`,
    text: `First Name: ${req.body.firstName}
    Email: ${req.body.email}
    Last Name: ${req.body.lastName}
    Restaurant Name: ${req.body.restaurantName}
    Phone Number: ${req.body.phone}
    `,
  };
  transporter.sendMail(mailData, (err, info) => {
    if (err)
      {console.log(err)};
    else
      {console.log(info)};
  });
  res.status(200);
}
