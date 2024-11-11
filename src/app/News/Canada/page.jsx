'use client';
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { countries } from "../News";



const Canada = ({ countryCode = 'ca' }) => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState(null)

  const apiKey = '507ad1459bae12be2f90905f3c723ea3';

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://api.mediastack.com/v1/news?access_key=${apiKey}&countries=${countryCode}&languages=en&sort=published_desc`);

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setNews(data.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [countryCode]);

  return (
    <div>
      <div className="mt-4 ">
        <div className=" space-x-3 space-y-3 ml-3  md:space-x-0 md:space-y-0 md:flex mt-3 md:justify-center gap-4">
          {countries.map((country)=> (
            <button key={country.id} className={`min-w-[70px] border rounded-full ${activeButton === country.id ? "bg-[#8ecae6] font-semibold text-white": ""}`}
            onClick={() => setActiveButton(country.id) }><Link href={country.link}> {country.country} </Link></button>
          ))}
        </div>
      </div>
      <h2 className="mt-3 px-4 mb-8 text-3xl flex justify-center md:block font-bold"> Headlines for Today</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Failed to load news. Please try again later.</p>}
      <div className="grid md:grid-cols-3 space-y-6">
      {!loading && !error && news.map((article, index) => (
        <div key={index} className="max-w-[400px] mx-4 px-2 py-2 rounded outline-none border">
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
            <p className="text-sm mt-2 text-justify">{article.description.slice(0,400) || "No description available."}</p>
            <p className="text-sm">{new Date(article.published_at).toLocaleDateString()}</p>
            <div className="flex justify-between items-center">
              <p>Source: {article.source || "Unknown"}</p>
              <Link href={article.url} passHref>
                <button className="h-10 w-24 rounded-lg bg-blue-500 text-white font-semibold mt-3">Read More</button>
              </Link>
            </div>
          </div>
          </div>
      ))}
      </div>
    </div>
  );
};

export default Canada;
