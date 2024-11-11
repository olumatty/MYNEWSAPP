"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const Page = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const apiKey = "507ad1459bae12be2f90905f3c723ea3";  
  const apiKey2 = "hRWF9On3mTWz5WveycUBdt8bNLJvv88e"; 
  
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://api.mediastack.com/v1/news?access_key=${apiKey}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data from MediaStack");
        }

        const data = await res.json();
        setNews(data.data.slice(0, 8));
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);


  return (
    <div className="p-6 flex flex-col">
      <div className="px-3">
        <h1 className="text-2xl font-bold mb-4">Top Stories Around The World</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Failed to load news. Please try again later.</p>}
        <div className="grid md:grid-cols-4 space-y-6">
          {!loading &&
            !error &&
            news.map((article, index) => (
              <div
                key={index}
                className="max-w-[300px] mx-4 px-2 py-2 rounded outline-none border"
              >
                {article.image && (
                  <Image
                    src={article.image}
                    alt="article image"
                    width={260}
                    height={200}
                    className="h-[200px] w-[400px] rounded-lg mx-auto"
                  />
                )}
                <div className="mt-2">
                  <div className="flex justify-between">
                    <h2 className="font-bold text-xl">{article.title}</h2>
                  </div>
                  <p className="text-sm mt-2 text-justify">
                    {article.description || "No description available."}
                  </p>
                  <p className="text-sm">
                    {new Date(article.published_at).toLocaleDateString()}
                  </p>
                  <div className="flex justify-between items-center">
                    <p>Source: {article.source || "Unknown"}</p>
                    <button className="h-10 w-24 rounded-lg bg-blue-500 text-white font-semibold mt-3">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
