// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const deepai = require("deepai"); // OR include deepai.min.js as a script tag in your HTML
deepai.setApiKey(process.env.DEEPAI_API_KEY);

async function getImage(prompt: string) {
  var resp = await deepai.callStandardApi("text2img", {
    text: prompt,
    grid_size: "1",
    width: "800",
    height: "600",
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
  res.status(200).json(await getImage(req.query?.prompt as string));
}
