"use client";


import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/debounce"; // kendi debounce hook'un

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([1,2,3]);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setSuggestions([]);
      return;
    }

    // Burada fake API simülasyonu yapıyorum:
    const fetchData = async () => {
      try {
        // Gerçekte buraya senin API endpoint’in gelecek
        const res = await fetch(`/api/search?q=${debouncedSearch}`);
        const data = await res.json();

        // Önerileri state'e kaydet
        setSuggestions(data.results.slice(0, 3)); // sadece 3 tanesini al
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [debouncedSearch]);

  const handleSelect = (value) => {
    setSearch(value);
    setSuggestions([]);
  };

  return (
    <div className="w-80 mx-auto mt-10 relative">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Food..."
        className="w-full p-2 border rounded-md"
      />

      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 border border-gray-300 rounded-md mt-1 bg-white shadow-md z-10">
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSelect(item)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
