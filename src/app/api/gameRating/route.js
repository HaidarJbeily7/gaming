import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { OpenAIApi, Configuration } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function getRatings(gameName, childAge) {
  let prompt = `
  ### Please rate the game "${gameName}" for a ${childAge}-year-old Muslim child. Your input is highly valued, so please enter the exact spelling of the game name. The game is to be rated on the following criteria:
  1. Social effects
  2. Religious point of view
  3. Financial implications
  4. Moral impact
  5. Psychological effects
  
  Each category should be rated on a scale of 1-5, with 1 being the lowest and 5 the highest. We also need to know on which operating platform the game runs, a brief description of the game in Arabic, and a URL for an image of the game.

  Please provide your responses in the following format:
  
  \`\`\`
  Game Name: [Enter Exact Game Name Here]
  Operating Platform: [Enter the Operating Platform Here]
  Description in Arabic: [Enter the Arabic Description Here]
  Image URL: [Enter Image URL Here]
  Trial Video URL: [Enter Video URL Here]
  Social effects: [Your Rating Here]
  Religious point of view: [Your Rating Here]
  Financial implications: [Your Rating Here]
  Moral impact: [Your Rating Here]
  Psychological effects: [Your Rating Here]
  \`\`\`
  `;


  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${prompt}`,
    max_tokens: 2000,
  });

  const gptResponseMessage = completion.data.choices[0].text;
  console.log(gptResponseMessage);
  const lines = gptResponseMessage.split("\n");
  console.log(lines);
  const responseValues = {};

  for (let line of lines) {
    if (line.length == 0) continue;
    let parts = line.trim().split(":");

    if (parts.length < 2) continue; // skip lines that don't have a ':'

    let key = parts[0].trim().toLowerCase();
    let value = parts.slice(1).join(":").trim(); // rejoin in case value contains ':'

    switch (key) {
      case "game name":
        responseValues.gameName = value;
        break;
      case "operating platform":
        responseValues.platform = value;
        break;
      case "description in arabic":
        responseValues.decription = value;
        break;
      case "social effects":
        responseValues.social = parseFloat(value) ?? 0;
        break;
      case "religious point of view":
        responseValues.religious = parseFloat(value) ?? 0;
        break;
      case "financial implications":
        responseValues.financial = parseFloat(value) ?? 0;
        break;
      case "moral impact":
        responseValues.moral = parseFloat(value) ?? 0;
        break;
      case "psychological effects":
        responseValues.psychological = parseFloat(value) ?? 0;
        break;
    }
  }
  return responseValues;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const gameName = searchParams.get("gameName");
  const childAge = searchParams.get("childAge");

  const filePath = path.join(process.cwd(), "src/data.json");
  const rawData = fs.readFileSync(filePath);
  const games = JSON.parse(rawData.toString());

  let game = games.find(
    (game) => game.game === gameName && game.childAge == childAge
  );
  if (!game) {
    const ratings = await getRatings(gameName, childAge);

    game = games.find(
      (game) => ratings.gameName === game.game && game.childAge == childAge
    );

    if (!game) {
      game = {
        game: ratings.gameName,
        childAge: childAge,
        ratings: ratings,
      };
      games.push(game);
      console.log(game);
      fs.writeFileSync(filePath, JSON.stringify(games, null, 2));
    }
  }

  return new NextResponse(JSON.stringify(game));
}
