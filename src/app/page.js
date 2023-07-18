"use client"
import GameRating from "@/components/GameRating";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";


export default function Home() {
  const [gameName, setGameName] = useState("");

  const [gameRating, setGameRating] = useState(null);

  const handleSearchChange = (event) => {
    setGameName(event.target.value);
  };

  const fetchGameRating = debounce(async () => {
    try {
      const response = await axios.get(`/api/gameRating?gameName=${gameName}`);
      console.log(response)
      setGameRating(response.data);

    } catch (error) {
      console.error("Error fetching game rating", error);
    }
  }, 3000);

  useEffect(() => {
    if (gameName) {
      fetchGameRating();
    }
  }, [gameName]);

  return (
    <>
      <Navbar />
      <main className="flex min-h-[81vh] flex-col items-center justify-start gap-8 p-12 max-w-5xl m-auto bg-[#F7F7F7] border-x-[1px] border-">
        <div className="w-full max-w-md mx-auto relative">
          <input
            className="w-full h-10 px-3 text-base text-center placeholder-gray-300 border rounded-2xl focus:shadow-outline"
            type="text"
            placeholder="ابحث عن تقييم لعبة"
            value={gameName}
            onChange={handleSearchChange}
          />
          <Image src="/search.png" width="33" height="33" alt="search" className="absolute left-2 top-1" />
        </div>

        { gameRating && 
          <GameRating gameRating={gameRating.ratings} />
        }
      </main>
      <footer className="w-ful p-4 bg-primary-color text-white text-center text-sm flex flex-col justify-center items-center">
          <Image src="/social.png" width="70" height="20" alt="ff" /> 
          All rights reserved 2023
      </footer>
    </>
  );
}
