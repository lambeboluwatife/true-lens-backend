const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const moment = require("moment");
dotenv.config({ path: "./src/config/config.env" });

function getFirstWord(inputString) {
  const words = inputString.trim().split(" ");
  return words.length > 0 ? words[0] : "";
}

exports.sendWelcomeEmail = (savedUser) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"True Lens Team" <process.env.EMAIL_USER>`,
    to: savedUser.email,
    subject: "Welcome to True Lens!",
    html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
          }
          .email-container {
            background-color: #ffffff;
            padding: 20px;
            margin: 0 auto;
            border-radius: 10px;
            max-width: 600px;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            background-color: blue;
            padding: 10px;
            color: white;
            border-radius: 10px 10px 0 0;
          }
          .content {
            padding: 20px;
            text-align: justify;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            color: #777777;
            font-size: 12px;
          }
          .button {
            display: inline-block;
            background-color: #5cb85c;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
         <div class="email-container">
          <div class="header">
            <h1>True Lens</h1>
            <h5>Decipher the Fact</h5>
          </div>
          <div class="content">
            <h3>Hello, ${getFirstWord(savedUser.name)}</h3>
            <h1>Welcome to True Lens!</h1>
            <p>Thank you for joining us. We're excited to have you on board!</p>
            <p>Unveiling the truth in the vast ocean of digital information.</p>
            <p>Best Regards,</p>
            <p>The True Lens Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${moment().year()} True Lens. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
     
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

exports.sendEventCreationEmail = (event) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Eventful Team" <${process.env.EMAIL_USER}>`,
    to: event.organizer.email,
    subject: "Welcome to Eventful!",
    html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
          }
          .email-container {
            background-color: #ffffff;
            padding: 20px;
            margin: 0 auto;
            border-radius: 10px;
            max-width: 600px;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            background-color: #d9534f;
            padding: 10px;
            color: white;
            border-radius: 10px 10px 0 0;
          }
          .content {
            padding: 20px;
            text-align: justify;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            color: #777777;
            font-size: 12px;
          }
          .button {
            display: inline-block;
            background-color: #5cb85c;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
         <div class="email-container">
          <div class="header">
            <h1>Eventful</h1>
          </div>
          <div class="content">
            <h3>Hello, ${event.organizer.organizationName}</h3>
            <h1>You created an event on Eventful</h1>
            <p>Thank you for trusting us with your events needs!</p>
            <h3>Here are your event details:</h3>
            <img src=${event.backdrop} />
            <p><strong>Title:</strong> ${event.title}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Description:</strong> ${event.description}</p>
            <p><strong>Category:</strong> ${event.category}</p>
            <p><strong>Date:</strong> ${moment(event.date).format(
              "dddd MMMM, YYYY"
            )}</p>
            <p><strong>Time:</strong> ${event.time}</p>
            <p><strong>Price:</strong> ${event.price}</p>
            <a href=${`https://eventful-frontend.vercel.app/events/details/${event._id}`} class="button">View Event Details</a>
            <p>Best Regards,</p>
            <p>The Eventful Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${moment().year()} Eventful. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
     
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

exports.sendReminderEmails = async (reminder, event) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Eventful Team" <${process.env.EMAIL_USER}>`,
    to: reminder.email,
    subject: "Event Reminder",
    html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
          }
          .email-container {
            background-color: #ffffff;
            padding: 20px;
            margin: 0 auto;
            border-radius: 10px;
            max-width: 600px;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            background-color: #d9534f;
            padding: 10px;
            color: white;
            border-radius: 10px 10px 0 0;
          }
          .content {
            padding: 20px;
            text-align: justify;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            color: #777777;
            font-size: 12px;
          }
          .button {
            display: inline-block;
            background-color: #5cb85c;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>Eventful</h1>
          </div>
          <div class="content">
            <h2>Hello,</h2>
            <p>We are excited to inform you about your upcoming event!</p>
            <p><strong>Event:</strong>${event.title}</p>
            <p><strong>Date:</strong>${moment(event.date).format(
              "dddd MMMM, YYYY"
            )}</p>
            <p><strong>Location:</strong>${event.location}</p>
            <a href="#" class="button">View Event Details</a>
          </div>
          <div class="footer">
            <p>&copy; ${moment().year()} Eventful. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
    `,
  };

  console.log(mailOptions);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
