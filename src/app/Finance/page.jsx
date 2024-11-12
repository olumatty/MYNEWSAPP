"use client";
import { useEffect, useState } from "react";
import Image from "next/image"; 

export default function Home() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/FinanceNews"); 
        
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setNews(data.data || data); 
        setLoading(false);
      } catch (error) {
        setError(error.message);
       
      }
    };
    fetchNews();
  }, []);

  return (
    <div>
      <h1 className="mt-3 px-4 mb-8 text-3xl flex justify-center md:block font-bold">
        Financial News
      </h1>
      {loading && <p>Loading...</p>}
      {error && <p>Failed to load news. Please try again later.</p>}
      {selectedArticle ? (
        <div className="p-4 max-w-3xl mx-auto border rounded">
          <h2 className="text-2xl font-bold">{selectedArticle.title}</h2>
          <p className="text-gray-500">
            {new Date(selectedArticle.published_at).toLocaleDateString()}
          </p>
          {selectedArticle.image && (
            <Image
              src={selectedArticle.image}
              alt="article image"
              width={600}
              height={400}
              className="my-4 rounded-lg"
            />
          )}
          <p className="mt-2 text-justify">
            {selectedArticle.description || "No description available."}
          </p>
          <p className="mt-4">
            {selectedArticle.source
              ? `Source: ${selectedArticle.source}`
              : "Source: Unknown"}
          </p>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => setSelectedArticle(null)}
          >
            Close
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 space-y-6">
          {!loading &&
            !error &&
            news.map((article, index) => (
              <div
                key={index}
                className="max-w-[400px] mx-4 px-2 py-2 rounded outline-none border"
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
                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="h-10 w-24 rounded-lg bg-blue-500 text-white font-semibold mt-3"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
