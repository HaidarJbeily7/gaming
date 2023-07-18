
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

// Helper function to generate random ratings
function generateRandomRatings() {
  return {
    "social": parseFloat((Math.random() * 5).toFixed(2)),
    "financial": parseFloat((Math.random() * 5).toFixed(2)),
    "psychological": parseFloat((Math.random() * 5).toFixed(2)),
    "religious": parseFloat((Math.random() * 5).toFixed(2)),
    "moral": parseFloat((Math.random() * 5).toFixed(2))
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const gameName = searchParams.get('gameName')
  
  const filePath = path.join(process.cwd(), 'data.json');
  const rawData = fs.readFileSync(filePath);
  const games = JSON.parse(rawData.toString());

  // Simulate a database lookup
  let game = games.find(game => game.game === gameName);
  if (!game) {
    game = {
      "game": gameName,
      "ratings": generateRandomRatings()
    };
    games.push(game);
    fs.writeFileSync(filePath, JSON.stringify(games, null, 2));
  }

  return new NextResponse(JSON.stringify(game));
}

