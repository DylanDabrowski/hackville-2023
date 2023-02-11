// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const cohere = require("cohere-ai");
cohere.init(process.env.COHERE_API_KEY);

async function makeEmail(prompt: string) {
  const resp = await cohere.generate({
    prompt: prompt,
    model: "command-xlarge-nightly",
    max_tokens: 500,
  });
  return resp;
}

type Data = {
  text: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // res.status(200).json(await getImage(req.query?.text as string));
  res.status(200).json(await makeEmail(req.query?.prompt as string));
}
