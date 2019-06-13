import sendgrid from "@sendgrid/mail";

require("dotenv").config();

sendgrid.setApiKey(process.env.SENDGRID_KEY);

export async function handler(event, context, callback) {
  if (event.httpMethod !== "POST") {
    return callback(null, {
      statusCode: 301,
      headers: {
        Location: "https://send-to-things.netlify.com/"
      },
      body: ""
    });
  }

  const body = JSON.parse(
    event.isBase64Encoded
      ? new Buffer(event.body, "base64").toString("utf8")
      : event.body
  );

  if (
    typeof body.title === "undefined" ||
    typeof body.content === "undefined"
  ) {
    return callback(null, {
      statusCode: 422,
      body: "Validation failed."
    });
  }

  await sendEmail(body)
    .then(() => {
      return callback(null, {
        statusCode: 200,
        body: "DONE"
      });
    })
    .catch(error => {
      return callback(error);
    });
}

function sendEmail({ title, content }) {
  return new Promise((resolve, reject) => {
    sendgrid.send(
      {
        to: process.env.THINGS_EMAIL,
        from: process.env.SEND_FROM,
        subject: title,
        text: content
      },
      false,
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result);
      }
    );
  });
}
