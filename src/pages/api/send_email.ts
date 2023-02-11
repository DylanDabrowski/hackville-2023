// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendMail(
  to: string,
  from: string,
  subject: string,
  text: string
) {
  const msg = await {
    to: to,
    from: from,
    subject: subject,
    text: text,
    html: "<strong>Hello World! My Name is Dylan :D</strong>",
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error: any) => {
      return error;
    });
  return msg;
}

type Data = {
  text: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { to, from, subject, text } = req.body;
  try {
    const response = await sendMail(to, from, subject, text);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send({ error: "failed to fetch data" });
  }
}
