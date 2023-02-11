import Head from "next/head";
import { useState, useEffect } from "react";

export default function Home() {
  const [subject, setSubject] = useState<string>("Skydiving Trip");
  const [opening, setOpening] = useState<string>("Hey Team!");
  const [time, setTime] = useState<string>("Monday 5:00PM to 8:00PM");
  const [location, setLocation] = useState<string>("180 Apple st, Toronto");

  const [output, setOutput] = useState<string>("");

  const makePrompt = () => {
    return `Please make a invite email that starts with ${opening}, discusses the topic of ${subject}, mentions these dates/times: ${time}, and finally mentions that it is all taking place at this location: ${location}`;
  };

  const makeEmail = async () => {
    const prompt = makePrompt();
    fetch(`/api/generate_email?prompt=${prompt}`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setOutput(result.body.generations[0].text);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <>
      <Head>
        <title>RSVPify</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-screen">
        <div className="flex flex-col m-5">
          <div>
            <h1 className="text-8xl text-gray-800">RSVPify!</h1>
            <p className="text-sm text-gray-500 mt-2">
              So you've planned a work party and now you need to invite all your
              coworkers? Don't waste time writing that email, let RSVPify do all
              the work for you! Enter information in the prompts and get an AI
              generated email to send to all your friends / family / coworkers
              or whoever may be waiting for your invite!
            </p>
          </div>
          {output ? (
            <p>{output}</p>
          ) : (
            <div className="max-w-xl mt-10">
              <input
                className="rounded-lg border p-3 w-full"
                type="text"
                placeholder="Subject for your email"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
              />
              <input
                className="rounded-lg border p-3 w-full mt-3"
                type="text"
                placeholder="How should it open? (ex. 'Hey Team!', 'Hello Everyone!')"
                value={opening}
                onChange={(e) => {
                  setOpening(e.target.value);
                }}
              />
              <input
                className="rounded-lg border p-3 w-full mt-3"
                type="text"
                placeholder="What Time(s) / Date(s) is the event?"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                }}
              />
              <input
                className="rounded-lg border p-3 w-full mt-3"
                type="text"
                placeholder="Where is the event being held?"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
              <button
                className="mt-8 ml-4 bg-green-500 w-32 p-3 rounded-xl"
                onClick={() => {
                  makeEmail();
                }}
              >
                RSVPify!
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
