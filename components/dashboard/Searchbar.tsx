"use client";

import { Search as SearchIcon } from "lucide-react";

export default function Searchbar() {
  return (
    <div className=" ">
      <div className="flex  items-center gap-3 rounded-2xl border border-[#EDEFF2] bg-white px-4 py-3 shadow-sm md:bg-[#FAFAFA]">
        <SearchIcon size={18} className="shrink-0 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
        />
      </div>
    </div>
  );
}