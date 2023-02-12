// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendMail(to: string, subject: string, text: string) {
  const recipients: string[] = to.split(" ");

  // \n doesn't work in html tags, instead it needs to be a <br>
  const htmlText = text.replace(/\n/g, "<br>");

  const msg = {
    to: recipients,
    from: process.env.SENDGRID_SENDER_EMAIL,
    subject: subject,
    text: text,
    html: `<p>${htmlText}</p>`,
  };
  await sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error: any) => {
      console.error(error);
      return error;
    });
  return msg;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  res
    .status(200)
    .json(await sendMail(req.body.to, req.body.subject, req.body.text));
}
