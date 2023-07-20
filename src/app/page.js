"use client";
import GameRating from "@/components/GameRating";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";

export default function Home() {
  const [gameName, setGameName] = useState("");

  const [gameRating, setGameRating] = useState(null);
  const [childAge, setChildAge] = useState("7");

  const handleSelectAge = (event) => {
    setChildAge(event.target.value);
  };
  const handleSearchChange = (event) => {
    setGameName(event.target.value);
    if (event.key === "Enter") {
      fetchGameRating();
    }
  };

  const fetchGameRating = debounce(async () => {
    try {
      const response = await axios.get(`/api/gameRating?gameName=${gameName}&childAge=${childAge}`);
      console.log(response);
      setGameRating(response.data);
    } catch (error) {
      console.error("Error fetching game rating", error);
    }
  }, 500);

  return (
    <>
      <Navbar />
      <main className="flex min-h-[81vh] flex-col items-center justify-start gap-8 p-12 max-w-5xl m-auto bg-[#F7F7F7] border-x-[1px] border-">
        <div className="flex gap-3 w-2/3 items-center">
          <div className="w-full  max-w-md mx-auto relative">
            <input
              className="w-full h-10 px-3 text-base text-center placeholder-gray-300 border rounded-2xl focus:shadow-outline"
              type="text"
              placeholder="ابحث عن تقييم لعبة"
              value={gameName}
              onChange={handleSearchChange}
              onKeyDown={handleSearchChange}
            />
            <Image
              src="/search.png"
              width="33"
              height="33"
              alt="search"
              className="absolute left-2 top-1"
            />
          </div>
          <div className="relative inline-flex w-[200px] max-w-md">
            <select
              onChange={handleSelectAge}
              value={childAge}
              className="w-full h-10 pl-3 pr-10 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
            >
              <option disabled >عمر الطفل</option>
              <option value="5">٥ سنوات</option>
              <option value="6">٦ سنوات</option>
              <option value="7">٧ سنوات</option>
              <option value="8">٨ سنوات</option>
              <option value="9">٩ سنوات</option>
              <option value="10">١٠ سنوات</option>
              <option value="11">١١ سنوات</option>
              <option value="12">١٢ سنوات</option>
              <option value="13">١٣ سنوات</option>
              <option value="14">١٤ سنوات</option>
              <option value="15">١٥ سنوات</option>
              <option value="16">١٦ سنوات</option>
              {/* add more age options as required */}
            </select>
            <div className="absolute right-0 top-0 h-full flex items-center pr-2 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        {gameRating && <GameRating gameRating={gameRating.ratings} />}
      </main>
      <footer className="w-ful p-4 bg-primary-color text-white text-center text-sm flex flex-col justify-center items-center">
        <Image src="/social.png" width="70" height="20" alt="ff" />
        All rights reserved 2023
      </footer>
    </>
  );
}
